import EmployeeJobs from "./EmployeeJobs"

interface EmployeeListProps {
    employees: Employee[]
    employeeToHighlight: number
}

const EmployeeList = (props: EmployeeListProps) => {
    return (
        <div className="mt-4 overflow-hidden">
            <h1 className="px-4 py-2 font-bold text-lg">Employee Catalog</h1>
            {props.employees.map((employee) => (
                <div className={`border-b-2 px-4 py-3 flex ${props.employeeToHighlight === employee.id ? "bg-light-orange" : ""}`} key={employee.id}>
                    {/* <img className="w-[100px] h-[100px] rounded-full object-cover mr-4" src={employee.photo} alt={employee.name} /> */}
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