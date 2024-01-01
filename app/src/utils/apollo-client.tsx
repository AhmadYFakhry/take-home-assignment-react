import {
    createHttpLink,
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    from,
    ApolloLink,
    gql,
    Observable,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { useContext } from 'react'
import { AuthContext } from '../context/auth'

interface RefreshSessionResponse {
    accessToken: string
    refreshToken: string
}

interface Props {
    children: React.ReactNode
}

export default function Apollo(props: Props) {
    const auth = useContext(AuthContext)

    const httpLink = createHttpLink({
        uri: 'http://localhost:8080/graphql',
    })

    const authLink = setContext((operation, { headers }) => {
        // Skip adding the headers for this one operation since we shouldn't use expired tokens
        if (operation.operationName === 'RefreshMutation') {
            return { headers }
        }

        // If theres a token in local storage, add it to the headers
        const token = localStorage.getItem('accessToken')
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        }
    })

    const errorLink: ApolloLink = onError(({ graphQLErrors, operation, forward }) => {
        if (graphQLErrors && graphQLErrors.some(error => error.extensions.code === 'SESSION_EXPIRED')) {
            const refreshToken = localStorage.getItem('refreshToken')
            const accessToken = localStorage.getItem('accessToken')

            // Check if tokens exist or if the refresh token is invalid
            if (!refreshToken || !accessToken) {
                auth.logout()
                return
            }

            return new Observable(observer => {
                refreshAuth(refreshToken, accessToken)
                    .then(tokens => {
                        if (!tokens) {
                            observer.complete()
                            return
                        }

                        auth.refresh(tokens.accessToken, tokens.refreshToken)

                        operation.setContext(({ headers = {} }) => ({
                            headers: {
                                ...headers,
                                authorization: `Bearer ${tokens.accessToken}`,
                            },
                        }))

                        forward(operation).subscribe({
                            next: observer.next.bind(observer),
                            error: observer.error.bind(observer),
                            complete: observer.complete.bind(observer),
                        })
                    })
                    .catch(error => {
                        auth.logout()
                        observer.error(error)
                    })
            })
        }
    })

    const client = new ApolloClient({
        // adds middleware for mutations and queries where applicable
        link: from([errorLink, authLink, httpLink]),
        cache: new InMemoryCache(),
    })

    async function refreshAuth(refreshToken: string, accessToken: string): Promise<RefreshSessionResponse | undefined> {
        try {
            const { data } = await client.mutate({
                mutation: gql`
                    mutation RefreshMutation($accessToken: String!, $refreshToken: String!) {
                        refreshSession(accessToken: $accessToken, refreshToken: $refreshToken) {
                            accessToken
                            refreshToken
                        }
                    }
                `,
                variables: {
                    refreshToken,
                    accessToken,
                },
            })
            if (data.refreshSession.accessToken) {
                return data.refreshSession
            }
        } catch (error) {
            // If something goes wrong, just default to logging the user out
            // Could be a bad refresh token or something else
            auth.logout()
        }
    }

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
