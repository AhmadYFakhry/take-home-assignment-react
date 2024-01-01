import { useContext } from 'react'
import { AuthContext } from '../context/auth'
import JudoLogoURL from '../assets/judo-logo.png'
import JudoButton from './JudoButton'
import { useNavigate } from 'react-router-dom'

function JudoHeader() {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div className="flex items-start justify-between mb-5">
            <div className="min-w-0 ">
                <img src={JudoLogoURL} className="h-8 w-auto sm:h-10" alt="Judo logo" />
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
                <JudoButton
                    onClick={logout}
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md px-3 py-2"
                >
                    Logout
                </JudoButton>
            </div>
        </div>
    )

    function logout() {
        auth.logout()
        navigate('/login')
    }
}

export default JudoHeader
