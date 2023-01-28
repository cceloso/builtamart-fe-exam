import { useState } from "react"
import { addJob, editJob } from "../services/job.service"
import Button from "./Button"

interface EmployeeFormProps {
    action: string
    job?: Job
    onClose: () => void
}

const JobForm = (props: EmployeeFormProps) => {
    const [name, setName] = useState(props.job ? props.job.name : "")

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()

        let res

        if (props.action === "add") {
            res = await addJob(name)
        } else if (props.action === "edit" && props.job) {
            res = await editJob(props.job.id, name)
        }

        if (res) {
            setName("")
            props.onClose()
            window.location.reload()
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="mb-4">
                <label className="font-semibold mr-2">Name</label>
                <input className='border-2 w-full p-2' value={name} onChange={(e) => setName(e.target.value)} type="text" required />
            </div>
            <div className="flex justify-end">
                <Button label={props.action === "add" ? "Save" : "Update"} />
            </div>
        </form>
    )
}

export default JobForm