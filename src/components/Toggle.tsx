interface ToggleProps {
    enabled: boolean
    setEnabled: () => void
}

import { Switch } from "@headlessui/react"

const Toggle = (props: ToggleProps) => {
    return (
        <Switch checked={props.enabled} onChange={props.setEnabled}>
            {({ checked }) => (
                <button
                    className={`${
                        checked ? 'bg-dark-orange' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                <span
                    className={`${
                        checked ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
                </button>
            )}
        </Switch>
    )
}

export default Toggle