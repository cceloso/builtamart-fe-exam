interface EmployeeFormProps {
    initialName: string
    initialPhoto: string
    initialFeatured: boolean
    action: string
    employee?: Employee
    onClose: (value: boolean) => void
}

import axios from 'axios'
import React, { useState } from 'react'
import useInput from '../hooks/useInput'
import Button from './Button'

const EmployeeForm = (props: EmployeeFormProps) => {
    const [name, bindName, resetName] = useInput(props.initialName)
    const [photo, bindPhoto, resetPhoto] = useInput(props.initialPhoto)
    const [isFeatured, setIsFeatured] = useState(props.initialFeatured)

    const submitHandler = (e: React.FormEvent) => {
        if (props.action === "add") {
            axios.post(`${import.meta.env.VITE_API_URL}/employees`, {
                name: name,
                photo: photo,
                featured: isFeatured,
                created_at: Date.now()
            })
            .then((res) => {
                console.log(res)
                resetName()
                resetPhoto()
                props.onClose()
            })
            .catch((err: Error) => {
                console.log(err)
            })
        }
        
        if (props.action === "edit") {
            // console.log("will edit!")
            axios.put(`${import.meta.env.VITE_API_URL}/employees/${props.employee?.id}`, {
                name: name,
                photo: photo,
                jobs: props.employee?.jobs,
                featured: isFeatured,
                created_at: props.employee?.created_at
            })
            .then((res) => {
                console.log(res)
                resetName()
                resetPhoto()
                props.onClose()
            })
            .catch((err: Error) => {
                console.log(err)
            })
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="font-semibold mr-2">Name</label>
                    <input className='border-2 w-full p-2' {...bindName} type="text" />
                </div>
                <div className="mb-4">
                    <label className="font-semibold mr-2">Photo</label>
                    <input className='border-2 w-full p-2' {...bindPhoto} type="text" />
                </div>
                <div className="mb-4 flex ">
                    <label className="font-semibold mr-2">Featured</label>
                    <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                </div>
                <Button label={props.action === "add" ? "Save" : "Update"} />
            </form>
        </div>
    )
}

export default EmployeeForm