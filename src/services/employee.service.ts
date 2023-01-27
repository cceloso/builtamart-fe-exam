import http from "../http-common"

class EmployeeService {
    getAll() {
        return http.get<Array<Employee>>("/employees")
    }
}

export default EmployeeService