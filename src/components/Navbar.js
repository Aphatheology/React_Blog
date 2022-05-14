import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

function Navbar() {
    const [user] = useAuthState(auth)
    
  return (
    <div className='navbar'>
        <Link to="/">Home</Link>
        {user && 
            <>
                <p>Signed in as {user.displayName}</p>

                <button onClick={() => {signOut(auth)}}>Sign Out</button>
            </>
        }
    </div>
  )
}

export default Navbar