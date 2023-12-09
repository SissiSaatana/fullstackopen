import axios from 'axios'

const getWeather = (lat, long) => {
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=fb850a775be6cc61eafa0aa841a2d3ef`
    const request = axios.get(baseUrl + 'all')
    return request.then(response => {
      console.log(response)
      console.log(response.data)
      return response.data
    })
}


export default { getWeather }