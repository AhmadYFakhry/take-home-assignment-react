import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import LoginPage from './pages/login'
import ProductsPage from './pages/products'
import HomePage from './pages/home'
import { useContext } from 'react'
import { AuthContext } from './context/auth'
function App() {
    const auth = useContext(AuthContext)
    const router = createBrowserRouter([
        {
            id: 'root',
            path: '/',
            children: [
                {
                    index: true,
                    Component: HomePage,
                },
                {
                    path: 'login',
                    loader: loginLoader,
                    Component: LoginPage,
                },
                {
                    path: 'products',
                    loader: protectedLoader,
                    Component: ProductsPage,
                },
            ],
        },
    ])

    async function loginLoader() {
        // If user is authenticated, redirect to products
        if (auth.accessToken && auth.refreshToken) {
            return redirect('/products')
        }
        return null
    }

    async function protectedLoader() {
        // If user is not authenticated, redirect to login
        if (!auth.accessToken && !auth.refreshToken) {
            return redirect('/login')
        }
        return null
    }

    return (
        <div className="w-full flex justify-center p-5 m-auto max-w-screen-md">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
