type Employee = {
    id: number
    name: string
    photo: string
    featured: boolean
    created_at: string
}

type Employees = Employee[]

type EmployeeJob = {
    id: number,
    employeeId: number,
    jobId: number
}