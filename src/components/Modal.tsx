interface ModalProps {
    open: boolean
    onClose: () => void
    onDelete?: () => void
    title: string
    employee?: Employee
    action: string
}

import { Dialog } from '@headlessui/react'
import EmployeeForm from './EmployeeForm'
import { XMarkIcon } from "@heroicons/react/24/outline"
import JobsForm from './JobsForm'
import DeleteForm from './DeleteForm'

const Modal = (props: ModalProps) => {
    return (
        <Dialog open={props.open} onClose={props.onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-sm rounded bg-white border-2 border-gray-200 flex flex-col justify-center p-6">
                    <Dialog.Title className="font-bold text-lg mb-4 flex items-center justify-between">
                        <div>{props.title}</div>
                        <XMarkIcon className="w-6" role="button" onClick={props.onClose} />
                    </Dialog.Title>

                    {props.action === "assign" &&
                        <JobsForm employee={props.employee} />
                    }

                    {(props.action === "add" || props.action === "edit") &&
                        <EmployeeForm initialName={props.employee?.name ? props.employee.name : ""} initialPhoto={props.employee?.photo ? props.employee.photo : ""} initialFeatured={props.employee?.featured ? props.employee?.featured : false} action={props.action} employee={props.employee} onClose={props.onClose} />
                    }
                    
                    {props. action === "delete" &&
                        <DeleteForm type="employee" onClose={props.onClose} onDelete={props.onDelete} />
                    }
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default Modal