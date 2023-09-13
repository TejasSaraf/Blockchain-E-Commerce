import Axios from "./axios"

export function Post(url, data = {}) {
  return Axios.post(url, data)
}

export function Get(url, data = {}) {
  return Axios.get( url, data)
}

export function Delete(url, data = {}) {
  return Axios.delete(url, data)
}

export function Patch(url, data = {}) {
  return Axios.patch(url, data)
}