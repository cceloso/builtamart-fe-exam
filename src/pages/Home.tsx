import axios from "axios"
import { useEffect, useState } from "react"
import Container from "../components/Container"
import EmployeeList from "../components/EmployeeList"

const Home = () => {
    const [featuredEmployees, setFeaturedEmployees] = useState<Employee[]>([])
    const [sortedEmployees, setSortedEmployees] = useState<Employee[]>([])
    
    useEffect(() => {
        const getEmployees = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/employees`)
                const employees: Employee[] = res.data

                const featured = employees.filter((employee) => employee.featured === true)
                setFeaturedEmployees(featured)

                const sorted = employees.sort((a, b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf())
                setSortedEmployees(sorted)
            } catch (err) {
                console.error(err)
            }
        }

        getEmployees()
    }, [])

    return (
        <Container>
            <EmployeeList employees={sortedEmployees} />
        </Container>
    )
}

export default Home