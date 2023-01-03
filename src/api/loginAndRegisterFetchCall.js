
import React from "react";

const MAIN_URL = `https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/`;



export const login = async (loginObj) => {
  return (
    await fetch(`${MAIN_URL}users/login`, {
      method: "POST",
      headers: {
        'Content-Type' : 'Application/json'
      },
      body : JSON.stringify(loginObj)
    })
    .then( res => res.json())
    .then( data =>  data)
    .catch(err => console.error(err))
  )
}

export const loggedIn = async (userToken) => {
  return (
    await fetch(`${MAIN_URL}users/me`, {
      headers: {
        'Content-type': 'Application/json',
        'Authorization' : `Bearer ${userToken}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      if(!data.success){
        window.localStorage.removeItem('token');
      } else{
        return data.data;
      }
    })
    .catch(err => console.error(err))
  );
}

export const registerUser = async (registerObj) => {
  return (
    await fetch(`${MAIN_URL}users/register`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'Application/json',
      },
      body: JSON.stringify(registerObj),
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err))
  );
}