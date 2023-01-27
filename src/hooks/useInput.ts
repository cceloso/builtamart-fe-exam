import { useState } from "react"

const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue)
    
    const bind = {
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    }

    const reset = () => {
        setValue(initialValue)
    }

    return [value, bind, reset]
}

export default useInput