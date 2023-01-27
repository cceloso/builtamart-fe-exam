import { useEffect, useState } from "react"
import axios from "axios"

export default function useFetch(url: string) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    const fetchData = (url: string) => {
    setLoading(true)
    axios.get(url)
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            setError(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData(url)
    }, [url])

    return { loading, data, error, fetchData }
}
