import React from 'react'

function login() {
  return (
    <form>
        <input type='email' placeholder='Enter Email'></input>
        <input type = 'password' placeholder='Password'></input>
        <button onClick={console.log('Clicked')}></button>
    </form>
  )
}

export default login;