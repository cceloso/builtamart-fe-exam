interface ErrorMessageProps {
    message: string
}

const ErrorMessage = (props: ErrorMessageProps) => {
    return (
        <div className="text-center">
            <p>{props.message}</p>
        </div>
    )
}

export default ErrorMessage