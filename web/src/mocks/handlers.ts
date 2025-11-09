import { http, HttpResponse } from 'msw'
import { user, lecturers, institutions } from '@/mocks/fixtures'

const apiUrl = (path: string | URL | RegExp) => {
  if (path instanceof RegExp) {
    return path
  }
  return new URL(path, import.meta.env.VITE_API_GATEWAY_URL).toString()
}

const authHandlers = [
  http.post(apiUrl('/auth/register'), () => {
    const json = JSON.stringify(user)
    return new HttpResponse(json, { status: 201 })
  }),
  http.post(apiUrl('/auth/login'), () => {
    return HttpResponse.json(user)
  }),
]

const employeesHandlers = [
  http.get(apiUrl('/users?kind=lecturer'), () => {
    return HttpResponse.json(lecturers)
  }),
  http.get(apiUrl(/\/users\/\d+/), (req) => {
    const url = new URL(req.request.url)
    const id = Number(url.pathname.split('/').pop())
    const lecturer = lecturers.find((lecturer) => lecturer.id === id)

    if (lecturer) {
      return HttpResponse.json(lecturer)
    } else {
      return new HttpResponse('Not Found', { status: 404 })
    }
  }),
]

const institutionsHandlers = [
  http.get(apiUrl('/institutions'), () => {
    return HttpResponse.json(institutions)
  }),
  http.get(apiUrl(/\/institutions\/\d+/), (req) => {
    const url = new URL(req.request.url)
    const id = Number(url.pathname.split('/').pop())
    const institution = { id, name: `University ${String.fromCharCode(64 + id)}` }

    if ([1, 2].includes(id)) {
      return HttpResponse.json(institution)
    } else {
      return new HttpResponse('Not Found', { status: 404 })
    }
  }),
]

export const handlers = [...authHandlers, ...employeesHandlers, ...institutionsHandlers]
