import axios from 'axios'

export default {
  signUserUp: async (email: string, password: string) => {
    const response = await axios.post('http://localhost:3000/api/users/register', {
      email,
      password
    }).then((response) => {
      return response
    }, (error) => {
      return error
    })
    return response
  },
  logUserIn: async (email: string, password: string) => {
    const response = await axios.post('http://localhost:3000/api/users/login', {
      email,
      password
    }).then((response) => {
      return response
    }, (error) => {
      return error
    })
    return response
  }
}