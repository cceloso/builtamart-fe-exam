
import React, { useState } from 'react'
import { addEmployee, editEmployee } from '../services/employee.service'
import Button from './Button'

interface EmployeeFormProps {
    initialName: string
    initialPhoto: string
    initialFeatured: boolean
    action: string
    employee?: Employee
    onClose: () => void
}

const EmployeeForm = (props: EmployeeFormProps) => {
    const [name, setName] = useState(props.initialName)
    const [photo, setPhoto] = useState(props.initialPhoto)
    const [isFeatured, setIsFeatured] = useState(props.initialFeatured)

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()

        let res

        if (props.action === "add") {
            res = await addEmployee(name, photo, isFeatured)
        } else if (props.action === "edit" && props.employee) {
            res = await editEmployee(props.employee.id, name, photo, isFeatured, props.employee.createdAt)
        }

        if (res) {
            setName("")
            setPhoto("")
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
            <div className="mb-4">
                <label className="font-semibold mr-2">Photo URL</label>
                <input className='border-2 w-full p-2' value={photo} onChange={(e) => setPhoto(e.target.value)} type="url" pattern="https://.*" required />
            </div>
            <div className="mb-2 flex ">
                <label className="font-semibold mr-2">Featured</label>
                <input className="w-4 accent-dark-orange" type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            </div>
            <div className="flex justify-end">
                <Button label={props.action === "add" ? "Save" : "Update"} />
            </div>
        </form>
    )
}

export default EmployeeForm