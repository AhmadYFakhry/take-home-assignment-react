import classNames from 'classnames'

interface Props {
    children: React.ReactNode
    // We could add more here eventually
    variant?: 'title' | 'subtitle' | 'text' | 'decoration'
    className?: string
}

function JudoTypography(props: Props) {
    const { variant, children, className } = props

    switch (variant) {
        case 'title':
            return <h1 className={classNames('text-3xl leading-10 font-semibold text-black', className)}>{children}</h1>
        case 'subtitle':
            return <h2 className={classNames('text-2xl font-bold text-black', className)}>{children}</h2>
        case 'text':
            return <p className={classNames('text-sm text-black', className)}>{children}</p>
        case 'decoration':
            return (
                <p className={classNames('text-sm text-gray-400 leading-6 tracking-normal', className)}>{children}</p>
            )
        default:
            return <p className={classNames('text-sm text-black', className)}>{children}</p>
    }
}

export default JudoTypography
