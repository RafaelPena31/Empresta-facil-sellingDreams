import axios from 'axios'

const api = axios.create({
  baseURL: 'https://emprestra-service.herokuapp.com/api'
})
export default api
