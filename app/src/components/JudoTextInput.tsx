import classNames from 'classnames'

interface Props {
    label: string
    type?: string
    labelClassName?: string
    inputClassName?: string
    placholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function JudoTextInput(props: Props) {
    return (
        <div>
            <label
                htmlFor={props.label}
                className={classNames(
                    'inline-block text-sm text-start mb-4 font-bold leading-6 text-gray-900',
                    props.labelClassName
                )}
            >
                {props.label}
            </label>
            <div className="">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                    <input
                        onChange={props.onChange}
                        type={props.type || 'text'}
                        name={props.label}
                        id={props.label}
                        autoComplete={props.label}
                        className={classNames(
                            'block flex-1 border-0 bg-transparent py-2 px-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6',
                            props.inputClassName
                        )}
                        placeholder={props.placholder || ''}
                    />
                </div>
            </div>
        </div>
    )
}

export default JudoTextInput
