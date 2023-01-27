import { Switch } from "@headlessui/react"
import { useEffect, useState } from "react"
import { addEmployeeJob, deleteEmployeeJob, getEmployeeJob } from "../services/employeeJob.service"
import { getJobs } from "../services/job.service"
import ErrorMessage from "./ErrorMessage"
import Spinner from "./Spinner"

interface AssignJobsFormProps {
    employee?: Employee
}

const AssignJobsForm = (props: AssignJobsFormProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [jobs, setJobs] = useState<Job[]>([])
    const [employeeJobs, setEmployeeJobs] = useState<EmployeeJob[]>([])

    const getEmployeeJobHelper = async (employeeId: number) => {
        const employeeJobsData = await getEmployeeJob(employeeId)

        if (employeeJobsData) {
            setEmployeeJobs(employeeJobsData)
        } else {
            setIsError(true)
        }
    }

    const toggleHandler = async (jobId: number) => {
        const employeeJob: EmployeeJob | undefined = employeeJobs.find((employeeJob) => employeeJob.jobId === jobId)

        let res

        if (employeeJob) {
            res = await deleteEmployeeJob(employeeJob.id)

            if (res && props.employee) {
                await getEmployeeJobHelper(props.employee.id)
            }
        } else {
            if (props.employee) {
                res = await addEmployeeJob(props.employee?.id, jobId)

                if (res) {
                    await getEmployeeJobHelper(props.employee.id)
                }
            }
        }
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

            if (props.employee) {
                await getEmployeeJobHelper(props.employee.id)
            }

            setIsLoading(false)
        }

        fetchData()
    }, [])
    
    return (
        <>
            <h2 className="font-semibold mb-4 truncate">Name: {props.employee?.name}</h2>

            {isLoading && <Spinner />}

            {isError && <ErrorMessage message="There was an error in loading jobs. Please try again." />}
            
            {jobs && employeeJobs && 
                jobs.map((job: Job) => (
                    <div className="flex items-center justify-between mb-4">
                        <p className="overflow-hidden truncate w-64">{job.name}</p>
                        <Switch checked={employeeJobs.some((employeeJob) => employeeJob.jobId === job.id)} onChange={() => toggleHandler(job.id)}>
                            {({ checked }) => (
                                <button
                                    className={`${
                                        checked ? 'bg-dark-orange' : 'bg-gray-200'
                                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                                >
                                <span
                                    className={`${
                                        checked ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                />
                                </button>
                            )}
                        </Switch>
                    </div>
                ))
            }
        </>
    )
}

export default AssignJobsForm