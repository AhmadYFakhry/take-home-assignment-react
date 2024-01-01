import { useNavigate } from 'react-router-dom'
import JudoButton from '../components/JudoButton'
import JudoTypography from '../components/JudoTypography'
import JudoCard from '../components/JudoCard'

function HomePage() {
    const navigate = useNavigate()

    return (
        <JudoCard className="flex flex-col max-w-md">
            <JudoTypography className="text-center" variant="title">
                Welcome to Judo!
            </JudoTypography>
            <JudoTypography className="text-gray-400 mb-3 text-center">Please login to continue.</JudoTypography>
            <JudoButton className="" onClick={navigateToLogin}>
                Continue to Login
            </JudoButton>
        </JudoCard>
    )

    function navigateToLogin() {
        navigate('/login')
    }
}

export default HomePage
