import axios from 'axios'

const PORT = process.env.PORT || 3001
const baseUrl = `http://localhost:${PORT}/api/persons`

const getAll = () => {
    return axios
            .get(baseUrl)
            .then( res => res.data )
}

const create = person => {
    return axios
            .post(baseUrl, person)
            .then( res => res.data )
}

const update = (id, newPerson) => {
    return axios
        .put(`${baseUrl}/${id}`, newPerson)
        .then( res => res.data )
}

const deletePerson = (id) => {
    return axios
            .delete(`${baseUrl}/${id}`)
            .then( res => res.data )
}

export default { getAll, create, update, deletePerson }