import { useState } from 'react'
import Button from '../components/Button'
import Container from '../components/Container'
import EmployeeList from '../components/EmployeeList'
import Modal from '../components/Modal'

const Employees = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const addHandler = () => {
        console.log("ADD!")
        setIsAddModalOpen(true)
    }

    return (
        <Container styles="py-6">
            <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Employee" action="add" />
            <div className="flex items-center justify-between mb-6">
                <h1 className="uppercase font-bold text-xl">Employees</h1>
                <button className="rounded-md border-2 px-2 border-gray-200 bg-gray-50 py-1 transition duration-300 hover:bg-gray-100" onClick={() => addHandler()}>+ Add Employee</button>
            </div>
            <EmployeeList />
        </Container>
  )
}

export default Employees