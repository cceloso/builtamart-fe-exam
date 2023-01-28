import { useEffect, useState } from "react"
import { deleteEmployee, getEmployees } from "../services/employee.service"
import AssignJobsForm from "./AssignJobsForm"
import Button from "./Button"
import DeleteForm from "./DeleteForm"
import EmployeeForm from "./EmployeeForm"
import ErrorMessage from "./ErrorMessage"
import Modal from "./Modal"
import Spinner from "./Spinner"

const EmployeeTable = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [employees, setEmployees] = useState<Employee[]>([])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isJobsModalOpen, setIsJobsModalOpen] = useState(false)
    const [employeeToEdit, setEmployeeToEdit] = useState<Employee>({} as Employee)

    const assignHandler = (employee: Employee) => {
        setEmployeeToEdit(employee)
        setIsJobsModalOpen(true)
    }

    const editHandler = (employee: Employee) => {
        setEmployeeToEdit(employee)
        setIsEditModalOpen(true)
    }
    
    const deleteHandler = (employee: Employee) => {
        setEmployeeToEdit(employee)
        setIsDeleteModalOpen(true)
    }
    
    const deleteEmployeeHelper = async (id: number) => {
        const res = await deleteEmployee(id)

        if (res) {
            window.location.reload()
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            const employeesData = await getEmployees()

            if (employeesData) {
                setEmployees(employeesData)
            } else {
                setIsError(true)
            }

            setIsLoading(false)
        }

        fetchData()
    }, [])

    return (
        <>
            <Modal open={isJobsModalOpen} onClose={() => setIsJobsModalOpen(false)} title="Assign Jobs">
                <AssignJobsForm employee={employeeToEdit} />
            </Modal>
            
            <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Employee">
                <EmployeeForm initialName={employeeToEdit.name ? employeeToEdit.name : ""} initialPhoto={employeeToEdit.photo ? employeeToEdit.photo : ""} initialFeatured={employeeToEdit.featured ? employeeToEdit.featured : false} action="edit" employee={employeeToEdit} onClose={() => setIsEditModalOpen(false)} />
            </Modal>
            
            <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Employee">
                <DeleteForm type="employee" onClose={() => setIsDeleteModalOpen(false)} onDelete={() => deleteEmployeeHelper(employeeToEdit.id)} />
            </Modal>

            {isLoading && <Spinner />}

            {isError && <ErrorMessage message="There was an error in loading employees. Please try again." />}

            {employees.length > 0 &&
                <div className="overflow-auto">
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
                            {employees.map((employee: Employee) => (
                                <tr className="border-b-2 border-gray-100 border-separate even:bg-gray-50" key={employee.id}>
                                    <td className="p-4">{employee.id}</td>
                                    <td className="mr-6 md:mr-0 p-4 flex gap-6 items-center">
                                        <img className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full object-cover" src={employee.photo} alt={employee.name} />
                                        <span className="truncate max-w-148">
                                            {employee.name}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <Button label="Jobs" onClick={() => assignHandler(employee)} />
                                    </td>
                                    <td className="p-4">
                                        <Button label="Edit" onClick={() => editHandler(employee)} />
                                    </td>
                                    <td className="p-4">
                                        <Button label="Delete" onClick={() => deleteHandler(employee)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {!isLoading && employees.length === 0 && <ErrorMessage message="No employees to display. Add an employee first" />}
        </>
    )
}

export default EmployeeTable