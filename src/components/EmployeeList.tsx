import EmployeeJobs from "./EmployeeJobs"

interface EmployeeListProps {
    employees: Employee[]
    employeeToHighlight: number
}

const EmployeeList = (props: EmployeeListProps) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 overflow-hidden">
            {props.employees.map((employee) => (
                <div className={`border-2 p-4 flex ${props.employeeToHighlight === employee.id ? "bg-orange" : ""}`} key={employee.id}>
                    {/* <img className="w-[100px] h-[100px] rounded-full object-cover mr-4" src={employee.photo} alt={employee.name} /> */}
                    <div className="flex flex-col">
                        <p className="font-bold truncate w-72">{employee.name}</p>
                        <EmployeeJobs id={employee.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EmployeeList