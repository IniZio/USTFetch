import React from 'react'
import io from 'socket.io-client'

const SERVER_URL = 'http://192.168.31.144'

export const SOCKET_URL = `${SERVER_URL}:8081`
const API_URL = `${SERVER_URL}:8080`

// Task
export function fetchTasks () {
  return fetch(`${API_URL}/task`)
    .then(response => response.json())
    .catch(err => console.error(err))
}

export function createTask (task) {
  return fetch(`${API_URL}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'xxxx'
    },
    body: JSON.stringify(task)
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}

export function updateTask (task) {
  return fetch(`${API_URL}/task`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'xxxx'
    },
    body: JSON.stringify(task)
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}
