import { useEffect, useState } from "react"
import Button from "./Button"
import DeleteForm from "./DeleteForm"
import JobForm from "./JobForm"
import Modal from "./Modal"
import { getJobs, deleteJob } from "../services/job.service"
import { getEmployeeJobs } from "../services/employeeJob.service"
import Spinner from "./Spinner"
import { ExclamationCircleIcon } from "@heroicons/react/24/solid"
import ErrorMessage from "./ErrorMessage"

const JobTable = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [jobs, setJobs] = useState<Job[]>([])
    const [employeeJobs, setEmployeeJobs] = useState<EmployeeJob[]>([])
    const [jobToEdit, setJobToEdit] = useState<Job>({} as Job)

    const editHandler = (job: Job) => {
        setJobToEdit(job)
        setIsEditModalOpen(true)
    }

    const deleteHandler = (job: Job) => {
        setJobToEdit(job)
        setIsDeleteModalOpen(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            const jobsData = await getJobs()

            if (jobsData) {
                setJobs(jobsData)
            } else {
                setIsError(true)
            }

            const employeeJobsData = await getEmployeeJobs()
            
            if (employeeJobsData) {
                setEmployeeJobs(employeeJobsData)
            } else {
                setIsError(true)
            }

            setIsLoading(false)
        }

        fetchData()
    }, [])

    return (
        <>
            <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Job">
                <JobForm job={jobToEdit} action="edit" onClose={() => setIsEditModalOpen(false)} />
            </Modal>

            <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Employee">
                <DeleteForm type="job" onClose={() => setIsDeleteModalOpen(false)} onDelete={() => deleteJob(jobToEdit.id)} />
            </Modal>

            {isLoading && <Spinner />}

            {isError &&
                <div className="flex flex-col items-center justify-center text-center text-dark-charcoal">
                    <ExclamationCircleIcon className="w-24" />
                    <h1 className="font-bold text-2xl my-4">Oops! Something went wrong.</h1>
                    <p>An error occured while loading this information. Please reload the page or try again later.</p>
                </div>
            }

            {jobs && employeeJobs &&
                <div className="overflow-auto">
                    <table className="table-auto overflow-scroll md:w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-100 border-separate">
                            <tr className="text-left">
                                <th className="p-4">ID</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Total Count of Employees</th>
                                <th className="p-4">Edit</th>
                                <th className="p-4">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job: Job) => (
                                <tr className="border-b-2 border-gray-100 border-separate even:bg-gray-50" key={job.id}>
                                    <td className="p-4">{job.id}</td>
                                    <td className="p-4">{job.name}</td>
                                    <td className="p-4">{employeeJobs.filter((employeeJob) => employeeJob.jobId === job.id).length}</td>
                                    <td className="p-4">
                                        <Button label="Edit" onClick={() => editHandler(job)} />
                                    </td>
                                    <td className="p-4">
                                        <Button label="Delete" onClick={() => deleteHandler(job)} disabled={employeeJobs.filter((employeeJob) => employeeJob.jobId === job.id).length > 0} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {!isLoading && jobs.length === 0 && <ErrorMessage message="No jobs to display. Add a job first" />}
                </div>
            }
        </>
    )
}

export default JobTable