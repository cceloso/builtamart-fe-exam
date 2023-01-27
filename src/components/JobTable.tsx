import axios from "axios"
import { useEffect, useState } from "react"
import Button from "./Button"
import DeleteForm from "./DeleteForm"
import JobsForm from "./JobsForm"
import Modal from "./Modal"

const JobTable = () => {
    const [jobs, setJobs] = useState<Job[]>([])
    const [employeeJobs, setEmployeeJobs] = useState<EmployeeJob[]>([])
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [jobToEdit, setJobToEdit] = useState<Job>({} as Job)

    const editHandler = (job: Job) => {
        console.log("EDIT!")
        setJobToEdit(job)
        setIsEditModalOpen(true)
    }

    const deleteHandler = (job: Job) => {
        console.log("DELETE")
        setJobToEdit(job)
        setIsDeleteModalOpen(true)
    }
    
    const deleteJob = (id: number) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${id}`)
        .then((res) => {
            console.log("deleted")
            window.location.reload()
        })
        .catch((err: Error) => {
            console.log(err)
        })
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/jobs`).then((res) => {
            setJobs(res.data)
        })
        
        axios.get(`${import.meta.env.VITE_API_URL}/employeeJobs`).then((res) => {
            setEmployeeJobs(res.data)
        })
    }, [])

    return (
        <>
            <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Job">
                <JobsForm job={jobToEdit} action="edit" onClose={() => setIsEditModalOpen(false)} />
            </Modal>

            <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Employee">
                <DeleteForm type="employee" onClose={() => setIsDeleteModalOpen(false)} onDelete={() => deleteJob(jobToEdit.id)} />
            </Modal>

            <table className="table-auto overflow-scroll md:w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-100 border-separate">
                    <tr className="text-left">
                        <th className="p-4">ID</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Total Count of Employees With This Job</th>
                        <th className="p-4">Edit</th>
                        <th className="p-4">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job: Job) => (
                        <tr className="border-b-2 border-gray-100 border-separate" key={job.id}>
                            <td className="px-4 py-5">{job.id}</td>
                            <td className="px-4 py-5">{job.name}</td>
                            <td className="px-4 py-5">{employeeJobs.filter((employeeJob) => employeeJob.jobId === job.id).length}</td>
                            <td className="px-4 py-5">
                                <Button label="Edit" onClick={() => editHandler(job)} />
                            </td>
                            <td className="px-4 py-5">
                                <Button label="Delete" onClick={() => deleteHandler(job)} disabled={employeeJobs.filter((employeeJob) => employeeJob.jobId === job.id).length > 0} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default JobTable