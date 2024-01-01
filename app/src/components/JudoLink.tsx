import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface Props {
    children: React.ReactNode
    url: string
    className?: string
}

function JudoLink(props: Props) {
    return (
        <Link to={props.url} className={classNames('text-sm leading-6  text-gray-900 block', props.className)}>
            {props.children}
        </Link>
    )
}

export default JudoLink
