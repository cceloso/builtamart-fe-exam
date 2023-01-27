
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from "@heroicons/react/24/outline"

interface ModalProps {
    open: boolean
    onClose: () => void
    title: string
    children?: React.ReactNode
}

const Modal = (props: ModalProps) => {
    return (
        <Dialog open={props.open} onClose={props.onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-sm rounded bg-white border-2 border-gray-200 flex flex-col justify-center p-6">
                    <Dialog.Title className="font-bold text-lg mb-4 flex items-center justify-between">
                        <h1>{props.title}</h1>
                        <XMarkIcon className="w-6" role="button" onClick={props.onClose} />
                    </Dialog.Title>
                    {props.children}
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default Modal