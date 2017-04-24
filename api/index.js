import React from 'react'

// const URL = 'http://192.168.31.144:8080'
const URL = 'http://10.89.80.125:8080'

// Task
export function fetchTasks () {
  return fetch(`${URL}/task`)
    .then(response => response.json())
    .catch(err => console.error(err))
}

export function createTask (task) {
  return fetch(`${URL}/task`, {
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
  return fetch(`${URL}/task`, {
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
