import axios from "axios"
import { useEffect, useState } from "react"
import Container from "../components/Container"
import EmployeeList from "../components/EmployeeList"
import Slideshow from "../components/Slideshow"

const Home = () => {
    const [featuredEmployeeIds, setFeaturedEmployeeIds] = useState<any[]>([])
    const [featuredEmployeePhotos, setFeaturedEmployeePhotos] = useState<any[]>([])
    const [sortedEmployees, setSortedEmployees] = useState<Employee[]>([])
    const [hoveredPhotoIndex, setHoveredPhotoIndex] = useState<number>(-1)

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/employees`)
                const employees: Employee[] = res.data

                let featured = employees.filter((employee) => employee.featured === true)
                let featuredIds = featured.map((employee) => employee.id)
                let featuredPhotos = featured.map((employee) => employee.photo)
                
                console.log(`featured: ${featured}`)
                setFeaturedEmployeeIds(featuredIds)
                setFeaturedEmployeePhotos(featuredPhotos)
                
                const sorted = employees.sort((a, b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf())
                setSortedEmployees(sorted)
            } catch (err) {
                console.error(err)
            }
        }

        getEmployees()
    }, [])

    return (
        <Container styles="mb-12">
            <Slideshow ids={featuredEmployeeIds} photos={featuredEmployeePhotos} onHover={setHoveredPhotoIndex} />
            <EmployeeList employees={sortedEmployees} employeeToHighlight={featuredEmployeeIds[hoveredPhotoIndex]} />
        </Container>
    )
}

export default Home