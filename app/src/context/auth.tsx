import React, { createContext, useReducer } from 'react'

interface AuthState {
    accessToken: string | null
    refreshToken: string | null
    login: (accessToken: string, refreshToken: string) => void
    logout: () => void
    refresh: (accessToken: string, refreshToken: string) => void
}

const initState: AuthState = {
    accessToken: null,
    refreshToken: null,
    login: () => {},
    logout: () => {},
    refresh: async () => '',
}

if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
    initState.accessToken = localStorage.getItem('accessToken')
    initState.refreshToken = localStorage.getItem('refreshToken')
}

export const AuthContext = createContext(initState)

const authReducer = (
    state: AuthState,
    action: { type: string; payload: { accessToken: string | null; refreshToken: string | null } }
) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            }
        case 'LOGOUT':
            return {
                ...state,
                accessToken: null,
                refreshToken: null,
            }
        case 'REFRESH':
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            }
        default:
            return state
    }
}

export function AuthProvider(props: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initState)

    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        dispatch({
            type: 'LOGIN',
            payload: {
                accessToken,
                refreshToken,
            },
        })
    }

    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch({
            type: 'LOGOUT',
            payload: {
                accessToken: null,
                refreshToken: null,
            },
        })
    }

    const refresh = async (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken)
        dispatch({
            type: 'REFRESH',
            payload: {
                refreshToken: localStorage.getItem('refreshToken'),
                accessToken: accessToken,
            },
        })
    }

    return (
        <AuthContext.Provider
            value={{ accessToken: state.accessToken, refreshToken: state.refreshToken, login, logout, refresh }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
