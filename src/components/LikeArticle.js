import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebaseConfig'

function LikeArticle({id, likes}) {
    const [user] = useAuthState(auth)
    const likesRef = doc(db, "Articles", id)

    function handleLike(id) {
        if(likes?.includes(user.uid)) {
            updateDoc(likesRef, {
                likes: arrayRemove(user.uid)
            })
            // .then(() => {
            //     console.log("unliked")
            // })
            .catch((error) => {
                console.log(error)
            })
        } else {
            updateDoc(likesRef, {
                likes: arrayUnion(user.uid)
            })
            // .then(() => {
            //     console.log("liked ")
            // })
            .catch((error) => {
                console.log(error)
            })
        }
    }
  return (
    <button onClick={() => handleLike(id)} style={{
        cursor: "pointer",
        color: likes?.includes(user.uid) ? "red" : "blue"
    }}>Like</button>
  )
}

export default LikeArticle