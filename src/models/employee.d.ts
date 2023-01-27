type Employee = {
    id: number
    name: string
    photo: string
    featured: boolean
    createdAt: string
}

type EmployeeJob = {
    id: number,
    employeeId: number,
    jobId: number
}