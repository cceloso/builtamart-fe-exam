import EmployeeJobs from "./EmployeeJobs"

interface EmployeeListProps {
    employees: Employee[]
    employeeToHighlight: number
}

const EmployeeList = (props: EmployeeListProps) => {
    return (
        <div className="overflow-hidden">
            <h1 className="px-4 py-2 uppercase font-bold text-lg">Employee Catalog</h1>
            {props.employees.map((employee) => (
                <div className={`border-b-2 px-4 py-3 flex transition duration-300 ${props.employeeToHighlight === employee.id ? "bg-light-orange" : ""}`} key={employee.id}>
                    <div className="flex flex-col md:flex-row">
                        <p className="font-semibold truncate w-72">{employee.name}</p>
                        <EmployeeJobs id={employee.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EmployeeList