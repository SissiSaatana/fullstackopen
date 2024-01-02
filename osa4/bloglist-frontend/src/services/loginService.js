import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

// const postLogin = (user) => {
//   const req = axios.post(baseUrl, user)
//   return req.then(res => {
//     console.log('res:', res)
//     return res.data
//   })
// }


const postLogin = async (user) => {
  const res = await axios
    .post(baseUrl, user)
    .catch(error => console.log('error', error))
  const userResponse = res.data.user
  userResponse.token = res.data.token
  return userResponse
}

export default { postLogin }