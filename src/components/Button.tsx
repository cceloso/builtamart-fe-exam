interface ButtonProps {
    label: string
    icon?: string
    onClick?: any
}

const Button = (props: ButtonProps) => {
    let styles = ""

    if (props.label === "Edit") {
        styles = "bg-green hover:bg-dark-green"
    } else if (props.label === "Delete") {
        styles = "bg-red hover:bg-dark-red"
    } else {
        styles = "bg-orange hover:bg-dark-orange"
    }

    return (
        <button onClick={props.onClick} className={`rounded-md text-white px-3 py-1 transition duration:300 ${styles}`}>
            {props.label}
        </button>
    )
}

export default Button