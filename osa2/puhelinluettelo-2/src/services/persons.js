import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request
        .then(response => {
            console.log('response', response)
            console.log('response.data', response.data)
            return response.data
        })
        .catch(e => console.log(`error: ${e}`))
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    
    return request.then(response => {
        console.log('response.data', response.data)
        console.log('response', response)
        return response.data
    })
}

const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => {
        console.log('response', response)
        return response.data
    })
}

export default { getAll, create, update, remove }