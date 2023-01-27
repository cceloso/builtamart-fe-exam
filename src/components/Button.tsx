interface ButtonProps {
    label: string
    icon?: string
    onClick?: any
    disabled?: boolean
}

const Button = (props: ButtonProps) => {
    let styles = ""

    if (props.label.includes("Add")) {
        styles = "border-2 border-gray-200 bg-gray-50 hover:bg-gray-100"
    } else if (props.label === "Edit") {
        styles = "bg-green hover:bg-dark-green text-white"
    } else if (props.label === "Delete") {
        styles = "bg-red hover:bg-dark-red text-white"
    } else if (props.label === "Cancel") {
        styles = "bg-gray-200 hover:bg-gray-300"
    } else {
        styles = "bg-orange hover:bg-dark-orange text-white"
    }

    if (props.disabled) {
        styles += " cursor-not-allowed"
    }

    return (
        <button onClick={props.onClick} className={`rounded-md px-3 py-1 disabled:opacity-75 transition duration:300 ${styles}`} disabled={props.disabled ? props.disabled : false}>
            {props.label}
        </button>
    )
}

export default Button