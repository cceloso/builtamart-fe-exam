interface ErrorMessageProps {
    message: string
}

const ErrorMessage = (props: ErrorMessageProps) => {
    return (
        <div className="text-center my-2">
            <p>{props.message}</p>
        </div>
    )
}

export default ErrorMessage