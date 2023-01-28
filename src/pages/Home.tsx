import { useEffect, useState } from "react"
import Container from "../components/Container"
import EmployeeList from "../components/EmployeeList"
import Slideshow from "../components/Slideshow"
import Spinner from "../components/Spinner"
import { getEmployees } from "../services/employee.service"
import { ExclamationCircleIcon } from "@heroicons/react/24/solid"
import ErrorMessage from "../components/ErrorMessage"

const Home = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [featuredEmployeeIds, setFeaturedEmployeeIds] = useState<any[]>([])
    const [featuredEmployeePhotos, setFeaturedEmployeePhotos] = useState<any[]>([])
    const [sortedEmployees, setSortedEmployees] = useState<Employee[]>([])
    const [hoveredPhotoIndex, setHoveredPhotoIndex] = useState<number>(-1)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            const employees: Employee[] = await getEmployees()

            if (employees) {
                const featured = employees.filter((employee) => employee.featured === true)
                const featuredIds = featured.map((employee) => employee.id)
                const featuredPhotos = featured.map((employee) => employee.photo)
                const sorted = employees.sort((a, b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf())
                
                setFeaturedEmployeeIds(featuredIds)
                setFeaturedEmployeePhotos(featuredPhotos)
                setSortedEmployees(sorted)
            } else {
                setIsError(true)
            }

            setIsLoading(false)
        }

        fetchData()
    }, [])

    return (
        <Container styles="mb-12">
            {isLoading && <Spinner />}

            {isError && 
                <div className="flex flex-col items-center justify-center text-center text-dark-charcoal">
                <ExclamationCircleIcon className="w-24" />
                    <h1 className="font-bold text-2xl my-4">Oops! Something went wrong.</h1>
                    <p>An error occured while loading this information. Please reload the page or try again later.</p>
                </div>
            }

            {!isLoading && sortedEmployees.length === 0 && <ErrorMessage message="No employees to display. Add an employee first" />}

            {sortedEmployees.length > 0 &&
                <>
                    {featuredEmployeeIds.length > 0 &&
                        <Slideshow ids={featuredEmployeeIds} photos={featuredEmployeePhotos} onHover={setHoveredPhotoIndex} />
                    }
                    <EmployeeList employees={sortedEmployees} employeeToHighlight={featuredEmployeeIds[hoveredPhotoIndex]} />
                </>
            }
        </Container>
    )
}

export default Home