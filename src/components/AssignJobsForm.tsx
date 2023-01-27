interface AssignJobsFormProps {
    employee?: Employee
}

import { Switch } from "@headlessui/react"
import axios from "axios"
import { useEffect, useState } from "react"

const AssignJobsForm = (props: AssignJobsFormProps) => {
    const [jobs, setJobs] = useState<Job[]>([])
    const [employeeJobs, setEmployeeJobs] = useState<EmployeeJob[]>([])

    const toggleHandler = (jobId: number) => {
        const employeeJob: EmployeeJob | undefined = employeeJobs.find((employeeJob) => employeeJob.jobId === jobId)

        if (employeeJob) {
            axios.delete(`${import.meta.env.VITE_API_URL}/employeeJobs/${employeeJob.id}`)
                .then((res) => {
                    console.log("deleted")
                    axios.get(`${import.meta.env.VITE_API_URL}/employeeJobs?employeeId=${props.employee?.id}`).then((res) => {
                        setEmployeeJobs(res.data)
                    })
                })
                .catch((err: Error) => {
                    console.log(err)
                })
        } else {
            axios.post(`${import.meta.env.VITE_API_URL}/employeeJobs`, {
                employeeId: props.employee?.id,
                jobId: jobId
            })
            .then((res) => {
                console.log(res)
                axios.get(`${import.meta.env.VITE_API_URL}/employeeJobs?employeeId=${props.employee?.id}`).then((res) => {
                    setEmployeeJobs(res.data)
                })
            })
            .catch((err: Error) => {
                console.log(err)
            })
        }
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/jobs`).then((res) => {
            setJobs(res.data)
        })
        
        axios.get(`${import.meta.env.VITE_API_URL}/employeeJobs?employeeId=${props.employee?.id}`).then((res) => {
            setEmployeeJobs(res.data)
        })
    }, [])
    
    return (
        <>
            <h2 className="font-semibold mb-4 truncate">Name: {props.employee?.name}</h2>
            {jobs.map((job: Job) => (
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
            ))}
        </>
    )
}

export default AssignJobsForm