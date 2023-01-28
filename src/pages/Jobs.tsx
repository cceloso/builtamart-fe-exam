import { useState } from 'react'
import Button from '../components/Button'
import Container from '../components/Container'
import JobForm from '../components/JobForm'
import JobTable from '../components/JobTable'
import Modal from '../components/Modal'

const Jobs = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const addHandler = () => {
        setIsAddModalOpen(true)
    }

    return (
        <Container styles="py-6">
            <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Job">
                <JobForm action="add" onClose={() => setIsAddModalOpen(false)} />
            </Modal>

            <div className="flex items-center justify-between mb-6">
                <h1 className="uppercase font-bold text-xl">Jobs</h1>
                <Button label="+ Add Job" onClick={() => addHandler()} />
            </div>
            
            <JobTable />
        </Container>
    )
}

export default Jobs