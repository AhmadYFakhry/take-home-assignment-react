import classNames from 'classnames'

interface Props {
    children: React.ReactNode
    className?: string
}

function JudoCard(props: Props) {
    return (
        <div className={classNames('w-full bg-white rounded-judo shadow-judo p-14 mb-8', props.className)}>
            {props.children}
        </div>
    )
}

export default JudoCard
