import axios from "axios";

const base_url = "http://localhost:3001/persons";

const create = (newNumber) => {
    const request =  axios.post(base_url, newNumber)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(base_url)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(base_url + `/${id}`)
    return request.then(response => response.data)
}

const updateNumber = (person) => {
    const request = axios.put(base_url + `/${person.id}`, person)
    return request.then(response => response.data)
}

export { create, getAll, deletePerson, updateNumber }