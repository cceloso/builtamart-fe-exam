import { ExclamationCircleIcon } from "@heroicons/react/24/solid"

const ErrorMessage = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center text-dark-charcoal">
            <ExclamationCircleIcon className="w-24" />
            <h1 className="font-bold text-2xl my-4">Oops! Something went wrong.</h1>
            <p>An error occured while loading this information. Please reload the page or try again later.</p>
        </div>
    )
}

export default ErrorMessage