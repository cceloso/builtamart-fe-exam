import { useEffect, useState } from "react"
import Container from "../components/Container"
import EmployeeList from "../components/EmployeeList"
import Slideshow from "../components/Slideshow"
import { getEmployees } from "../services/employee.service"

const Home = () => {
    const [featuredEmployeeIds, setFeaturedEmployeeIds] = useState<any[]>([])
    const [featuredEmployeePhotos, setFeaturedEmployeePhotos] = useState<any[]>([])
    const [sortedEmployees, setSortedEmployees] = useState<Employee[]>([])
    const [hoveredPhotoIndex, setHoveredPhotoIndex] = useState<number>(-1)

    useEffect(() => {
        const fetchData = async () => {
            const employees: Employee[] = await getEmployees()
            const featured = employees.filter((employee) => employee.featured === true)
            const featuredIds = featured.map((employee) => employee.id)
            const featuredPhotos = featured.map((employee) => employee.photo)
            const sorted = employees.sort((a, b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf())
            
            setFeaturedEmployeeIds(featuredIds)
            setFeaturedEmployeePhotos(featuredPhotos)
            setSortedEmployees(sorted)
        }

        fetchData()
    }, [])

    return (
        <Container styles="mb-12">
            <Slideshow ids={featuredEmployeeIds} photos={featuredEmployeePhotos} onHover={setHoveredPhotoIndex} />
            <EmployeeList employees={sortedEmployees} employeeToHighlight={featuredEmployeeIds[hoveredPhotoIndex]} />
        </Container>
    )
}

export default Home