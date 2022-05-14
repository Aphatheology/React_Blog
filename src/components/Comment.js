import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebaseConfig'
import { v4 as uuidv4 } from 'uuid'

function Comment({id}) {
    const [comments, setComments] = useState([])
    const [commentForm, setCommentForm] = useState("")
    const [currentlyLoggedInUser] = useAuthState(auth)
    //console.log(currentlyLoggedInUser)
    const newCommentRef = doc(db, "Articles", id);
    useEffect(() => {
        const commentRef = doc(db, "Articles", id);
        onSnapshot(commentRef, (snapshot) => {
            setComments(snapshot.data().comments)
            // console.log(snapshot.data)
            // console.log(comments)
        })
        
    }, [])

    // function handleDeleteComment(comment) {
    //     console.log(comment)
    //     updateDoc(newCommentRef, {
    //         comments: arrayRemove(comment),
    //     })
    //     .then(e => console.log(e))
    //     .catch(e => console.log(e))
    // }

    const handleDeleteComment = (comment) => {
       
        updateDoc(newCommentRef, {
            comments: arrayRemove(comment),
        })
        
        .catch((error) => {
            console.log(error);
        })
      };
    // function handleCommentForm(e) {
    //     const [name, value] = e.target;
    //     setCommentForm({[name]: value})
    // }

    function submitComment(e) {
        updateDoc(newCommentRef, {
            comments: arrayUnion({
                user: currentlyLoggedInUser.uid,
                userName: currentlyLoggedInUser.displayName,
                comment: commentForm,
                createdAt: new Date(),
                commentId: uuidv4()
            })
        }).then(() => setCommentForm(""))

        
    }
    
    // comment
    // "nice article"
    // commentId
    // "93331528-5a46-4f4b-beea-c402e3ff7795"
    // createdAt
    // May 13, 2022 at 4:47:33 PM UTC+1
    // user
    // "OG8ilVnXzXO34Ri1d4EuzCMw4ON2"
    // userName
    // "anonbeeta"{commentId, user, comment, userName}

  return (
    <div>
        {
            currentlyLoggedInUser && 

            <div className='comment'> 
            
                <input 
                    type="text" 
                    value={commentForm} 
                    name="comment" 
                    onChange={(e) => setCommentForm(e.target.value)}
                    placeholder="Enter comment"
                />
                <button onClick={submitComment}>Post Comment</button>
            </div>
        }
        { comments !== null && 
            comments.map(({commentId, userName, user, comment, createdAt}) => (
                
                <div key={commentId}>
                    
                   <h4 style={{
                       color: currentlyLoggedInUser !== null && user === currentlyLoggedInUser.uid ? "green" : "blue"
                   }}>{userName}</h4> 
                   {/* <p>{currentlyLoggedInUser.uid}</p> */}
                   <p>{comment}</p>
                   {    
                        currentlyLoggedInUser !== null && user === currentlyLoggedInUser.uid &&
                       <button onClick={() => handleDeleteComment({ commentId, user, comment, userName , createdAt})}>Delete Comment</button>
                   }
                   
                </div>
                // <p>{comments.length}</p>
            ))
            
        }
        
    </div>
  )
}

export default Comment