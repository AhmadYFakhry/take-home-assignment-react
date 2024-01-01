import classNames from 'classnames'

interface Props {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean
}

function JudoButton(props: Props) {
    return (
        <button
            type={props.type || 'button'}
            onClick={props.onClick}
            className={classNames(
                'rounded-sm leading-6 bg-judo-purple inline-flex w-full justify-center font-bold px-3 py-2.5 text-sm text-white shadow-sm hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600',
                props.className
            )}
        >
            {props.loading && <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />}
            {!props.loading && props.children}
        </button>
    )
}

export default JudoButton
