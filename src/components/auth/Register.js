import { useState } from 'react'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [registerForm, setRegisterForm] = useState({
        email: "",
        username: "",
        password: ""
    })
    const navigate = useNavigate();
            

    function handleRegisterForm(e) {
        const {name, value} = e.target
        setRegisterForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    async function handleSignUp() {
        try {
            await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password)
            updateProfile(auth.currentUser, {displayName: registerForm.username})
            navigate("/")
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='register'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={registerForm.email}
                name="email"
                onChange={handleRegisterForm}
                placeholder="Email"
            />

            <input
                type="text"
                value={registerForm.username}
                name="username"
                onChange={handleRegisterForm}
                placeholder="Username"
            />

            <input
                type="password"
                value={registerForm.password}
                name="password"
                onChange={handleRegisterForm}
                placeholder="Password"
            />

            <button onClick={handleSignUp}>Submit</button>
        </form>
    </div>
  )
}

export default Register