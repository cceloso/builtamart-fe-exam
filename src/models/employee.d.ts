type Employee = {
    id: number
    name: string
    photo: string
    featured: boolean
    created_at: string
}

type EmployeeJob = {
    id: number,
    employeeId: number,
    jobId: number
}