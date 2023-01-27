import axios from "axios"
import { useState } from "react"
import useFetch from "../hooks/useFetch"
import Button from "./Button"
import Modal from "./Modal"

const EmployeeTable = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isJobsModalOpen, setIsJobsModalOpen] = useState(false)
    const [employeeToEdit, setEmployeeToEdit] = useState<Employee>({} as Employee)

    const assignHandler = (employee: Employee) => {
        console.log("ASSIGN!")
        setEmployeeToEdit(employee)
        setIsJobsModalOpen(true)
    }

    const editHandler = (employee: Employee) => {
        console.log("EDIT!")
        setEmployeeToEdit(employee)
        setIsEditModalOpen(true)
    }
    
    const deleteHandler = (employee: Employee) => {
        console.log("DELETE")
        setEmployeeToEdit(employee)
        setIsDeleteModalOpen(true)
    }
    
    const deleteEmployee = (id: number) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/employees/${id}`)
        .then((res) => {
            console.log("deleted")
            window.location.reload()
        })
        .catch((err: Error) => {
            console.log(err)
        })
    }

    const { loading, data, error } = useFetch(`${import.meta.env.VITE_API_URL}/employees`)

    if (loading) {
        console.log("loading...")
    } else if (error) {
        console.log(error)
    }

    return (
        <>
            <Modal open={isJobsModalOpen} onClose={() => setIsJobsModalOpen(false)} title="Assign Jobs" employee={employeeToEdit} action="assign" />
            <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Employee" employee={employeeToEdit} action="edit" />
            <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={() => deleteEmployee(employeeToEdit.id)} title="Delete Employee" employee={employeeToEdit} action="delete" />

            <table className="table-auto overflow-scroll md:w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-100 border-separate">
                    <tr className="text-left">
                        <th className="p-4">ID</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Jobs</th>
                        <th className="p-4">Edit</th>
                        <th className="p-4">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((employee: Employee) => (
                        <tr className="border-b-2 border-gray-100 border-separate" key={employee.id}>
                            <td className="px-4 py-6">{employee.id}</td>
                            <td className="px-4 py-6 flex gap-6 items-center">
                                <img className="w-[50px] h-[50px] rounded-full object-cover" src={employee.photo} alt={employee.name} />
                                <span>
                                    {employee.name}
                                </span>
                            </td>
                            <td className="px-4 py-6">
                                <Button label="Jobs" onClick={() => assignHandler(employee)} />
                            </td>
                            <td className="px-4 py-6">
                                <Button label="Edit" onClick={() => editHandler(employee)} />
                            </td>
                            <td className="px-4 py-6">
                                <Button label="Delete" onClick={() => deleteHandler(employee)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default EmployeeTable