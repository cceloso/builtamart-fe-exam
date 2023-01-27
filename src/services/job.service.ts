import axios from "axios"

class JobService {
    apiUrl = `${import.meta.env.VITE_API_URL}/jobs`

    getJobs(): any {
        axios.get(this.apiUrl)
            .then((res) => {
                console.log(res.data);
                return res.data
            })
            .catch((err) => {
                console.log(err)
                return err
            })
    }
}

export default new JobService()