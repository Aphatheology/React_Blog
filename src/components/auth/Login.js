import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
            

    function handleLoginForm(e) {
        const {name, value} = e.target
        setLoginForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    async function handleLogin() {
        try {
           
            await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
            // updateProfile(auth.currentUser, {displayName: registerForm.username})
            navigate("/")
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='register'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={loginForm.email}
                name="email"
                onChange={handleLoginForm}
                placeholder="Email"
            />

            <input
                type="password"
                value={loginForm.password}
                name="password"
                onChange={handleLoginForm}
                placeholder="Password"
            />

            <button onClick={handleLogin}>Login</button>
        </form>
    </div>
  )
}

export default Login