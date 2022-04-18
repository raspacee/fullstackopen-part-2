import axios from "axios";

const base_url = "http://localhost:3001/persons";

const create = (newNumber) => {
    const request =  axios.post(base_url, newNumber)
    return request.then(response => response.data)
}

export { create }