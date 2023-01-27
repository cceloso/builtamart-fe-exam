import axios from "axios"
import { useState } from "react"
import EmployeeJobs from "./EmployeeJobs"

interface EmployeeListProps {
    employees: Employee[]
}

const EmployeeList = (props: EmployeeListProps) => {
    return (
        <div className="grid grid-cols-3 gap-4 mt-6 overflow-hidden">
            {props.employees.map((employee) => (
                <div className="border-2 p-4 flex" key={employee.id}>
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