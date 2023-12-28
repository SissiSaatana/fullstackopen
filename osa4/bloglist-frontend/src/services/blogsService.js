import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const setToken = newToken => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const postNewBlog = async (blog) => {
  const res = await axios
    .post(baseUrl, blog)
    .catch(error => console.log('error', error))
  return res.data
}

export default { getAll, setToken }