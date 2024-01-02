import JudoLogoURL from '../assets/judo-logo.png'
import JudoLink from '../components/JudoLink'
import { gql, useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/auth'
import JudoButton from '../components/JudoButton'
import JudoTextInput from '../components/JudoTextInput'
import JudoTypography from '../components/JudoTypography'
import JudoCard from '../components/JudoCard'

function LoginPage() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const auth = useContext(AuthContext)

    const [authenticate, { error, loading }] = useMutation(gql`
        mutation Authenticate($email: String!, $password: String!) {
            authenticate(email: $email, password: $password) {
                accessToken
                refreshToken
            }
        }
    `)

    return (
        <form onSubmit={handleSubmit} className="max-w-[466px]">
            <JudoCard>
                <img src={JudoLogoURL} className="mb-10" />
                <JudoTypography variant="title" className="text-start mb-8">
                    Sign In
                </JudoTypography>

                <div className="flex flex-col justify-start w-full gap-y-6 mb-6">
                    <JudoTextInput onChange={updateEmail} placholder={'andrea@judo.app'} label="Email" />
                    <JudoTextInput onChange={updatePassword} label="Password" type="password" />
                </div>

                <JudoButton loading={loading} type={'submit'}>
                    Sign in
                </JudoButton>

                {error && <p className="mt-8 text-sm text-red-400">{error.message}</p>}

                {/* Left href since we don't actually have a page */}
                <JudoLink className="mt-8 font-bold text-center" url="#">
                    Forgot Password?
                </JudoLink>
            </JudoCard>
            <JudoTypography className="text-center" variant="decoration">
                ©2001–2019 All Rights Reserved. Clip® is a registered trademark of Rover Labs. Cookie Preferences,
                Privacy, and Terms.
            </JudoTypography>
        </form>
    )

    function updatePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function updateEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { data } = await authenticate({ variables: { email, password } })
        if (data.authenticate.accessToken) {
            // Sets the access and refresh token in local storage and in context
            auth.login(data.authenticate.accessToken, data.authenticate.refreshToken)
        }
    }
}

export default LoginPage
