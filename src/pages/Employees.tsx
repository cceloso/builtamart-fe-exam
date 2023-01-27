import { useState } from 'react'
import Button from '../components/Button'
import Container from '../components/Container'
import EmployeeForm from '../components/EmployeeForm'
import EmployeeTable from '../components/EmployeeTable'
import Modal from '../components/Modal'

const Employees = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const addHandler = () => {
        setIsAddModalOpen(true)
    }

    return (
        <Container styles="py-6">
            <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Employee">
                <EmployeeForm initialName="" initialPhoto="" initialFeatured={false} action="add" onClose={() => setIsAddModalOpen(false)} />
            </Modal>

            <div className="flex items-center justify-between mb-6">
                <h1 className="uppercase font-bold text-xl">Employees</h1>
                <Button label="+ Add Employee" onClick={() => addHandler()} />
            </div>

            <EmployeeTable />
        </Container>
  )
}

export default Employees