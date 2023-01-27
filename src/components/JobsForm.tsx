import axios from "axios"
import { useState } from "react"
import Button from "./Button"

interface EmployeeFormProps {
    // initialName: string
    action: string
    job?: Job
    onClose: () => void
}

const JobsForm = (props: EmployeeFormProps) => {
    const [name, setName] = useState(props.job ? props.job.name : "")

    const submitHandler = (e: React.FormEvent) => {
        if (props.action === "add") {
            axios.post(`${import.meta.env.VITE_API_URL}/jobs`, {
                name: name,
            })
            .then((res) => {
                console.log(res)
                setName("")
                props.onClose()
            })
            .catch((err: Error) => {
                console.log(err)
            })
        }
        
        if (props.action === "edit") {
            axios.put(`${import.meta.env.VITE_API_URL}/jobs/${props.job?.id}`, {
                name: name,
            })
            .then((res) => {
                console.log(res)
                setName("")
                props.onClose()
            })
            .catch((err: Error) => {
                console.log(err)
            })
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="mb-4">
                <label className="font-semibold mr-2">Name</label>
                <input className='border-2 w-full p-2' value={name} onChange={ e => setName(e.target.value)} type="text" required />
            </div>
            <Button label={props.action === "add" ? "Save" : "Update"} />
        </form>
    )
}

export default JobsForm