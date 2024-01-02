import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const setToken = newToken => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const postNewBlog = async blog => {
  const res = await axios
    .post(baseUrl, blog)
    .catch(error => console.log('error', error))
  return res.data
}

const updateBlog = async blog => {
  const res = await axios
    .put(baseUrl, blog)
    .catch(error => console.log('error', error))
  return res.data
}

const deleteBlog = async blogId => {
  const res = await axios
    .delete(`${baseUrl}/${blogId}`)
    .catch(error => console.log('error', error))
  return res
}

export default { getAll, setToken, postNewBlog, updateBlog, deleteBlog }