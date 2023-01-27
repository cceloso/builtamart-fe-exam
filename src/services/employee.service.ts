import axios from "axios"

export const addEmployee = async (name: string, photo: string, featured: boolean) => {
    try {
        const res = await axios.post("/employees", {
            name: name,
            photo: photo,
            featured: featured,
            createdAt: new Date()
        })
        return res
    } catch (err) {
        console.error(err)
        return null
    }
}

export const editEmployee = async (id: number, name: string, photo: string, featured: boolean, createdAt: string) => {
    try {
        const res = await axios.put(`/employees/${id}`, {
            name: name,
            photo: photo,
            featured: featured,
            createdAt: createdAt
        })
        return res
    } catch (err) {
        console.error(err)
        return null
    }
}