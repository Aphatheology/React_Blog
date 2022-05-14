import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom'
import { auth, db } from '../firebaseConfig';
import Comment from './Comment';
import LikeArticle from './LikeArticle';

function ReadEachArticle() {
    const {id} = useParams();
    const [article, setArticle] = useState(null);
    const [user] = useAuthState(auth)
    useEffect(() => {
        const docRef = doc(db, "Articles", id);
        onSnapshot(docRef, (snapshot) => {
            setArticle({...snapshot.data(), id: snapshot.id})
        })
    }, [])
  return (
    <div>
        {
            article && 
            <div>
                
                <h2>{article.title}</h2>
                <p>Created on {article.createdAt.toDate().toDateString()} by {article.createdBy}</p>
                <img src={article.imgUrl} />
                <p>{article.description}</p>
                {user && <LikeArticle id={id} likes={article.likes} />}
                <Comment id={article.id}/>
            
            </div>
        }
    </div>
  )
}

export default ReadEachArticle