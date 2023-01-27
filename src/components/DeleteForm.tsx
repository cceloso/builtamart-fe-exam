import Button from "./Button"

interface DeleteFormProps {
    type: string
    onClose: () => void
    onDelete: () => void
}

const DeleteForm = (props: DeleteFormProps) => {
    return (
        <div>
            <h2 className="mb-4">Are you sure you want to delete this {props.type}?</h2>
            <div className="flex gap-3 justify-end">
                <Button label="Cancel" onClick={props.onClose} />
                <Button label="Delete" onClick={props.onDelete} />
            </div>
        </div>
    )
}

export default DeleteForm