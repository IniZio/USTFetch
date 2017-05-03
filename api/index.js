import React from 'react'
import { AsyncStorage } from 'react-native'
import io from 'socket.io-client'

const SERVER_URL = 'http://192.168.31.144'

export const SOCKET_URL = `${SERVER_URL}:8081`
const API_URL = `${SERVER_URL}:8080`

const jsonHeader = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

// Login
export function loginUser (form) {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { ...jsonHeader },
    body: JSON.stringify(form)
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}

export async function logoutUser () {
  let token = await AsyncStorage.getItem('Authorization')
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { Authorization: token, ...jsonHeader },
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}

export function registerUser (form) {
  return fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: { ...jsonHeader },
    body: JSON.stringify(form)
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}

export async function fetchUserProfile (itsc) {
  let token = await AsyncStorage.getItem('Authorization')
  return fetch(`${API_URL}/user/${itsc}`, {
    headers: { Authorization: token }
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}

// Task
export async function fetchTasks (page = 0) {
  let token = await AsyncStorage.getItem('Authorization')
  return fetch(`${API_URL}/task?page=${page}`, {
    headers: { Authorization: token, ...jsonHeader }
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}

export async function fetchChats () {
  let token = await AsyncStorage.getItem('Authorization')
  let itsc = await AsyncStorage.getItem('itsc')
  return fetch(`${API_URL}/task?fid=${itsc}`, {
    headers: { Authorization: token, ...jsonHeader }
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}

export async function createTask (task) {
  let token = await AsyncStorage.getItem('Authorization')
  return fetch(`${API_URL}/task`, {
    method: 'POST',
    headers: { Authorization: token, ...jsonHeader },
    body: JSON.stringify(task)
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}

export async function updateTask (task, change) {
  let token = await AsyncStorage.getItem('Authorization')
  return fetch(`${API_URL}/task/${task._id}`, {
    method: 'PUT',
    headers: { Authorization: token, ...jsonHeader },
    body: JSON.stringify(change)
  })
    .then(response => console.log(response))
    .catch(err => console.error(err))
}
