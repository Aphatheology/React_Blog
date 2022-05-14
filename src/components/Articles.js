import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link } from "react-router-dom"
import { auth, db } from "../firebaseConfig"
import DeleteArticle from "./DeleteArticle"
import LikeArticle from "./LikeArticle"



function Articles() {
    const [articles, setArticles] = useState([])
    const [user] = useAuthState(auth )
    useEffect(() => {
        const articlesRef = collection(db, "Articles");

        const q = query(articlesRef, orderBy("createdAt", "desc"))

        onSnapshot(q, (snapshot ) => {
            const articles = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setArticles(articles)
            // console.log(articles)
        })
    }, [])
  return (
    <div className="articles">
        {
            articles.length === 0 ? (<p>No Articles found</p>) : 
            (
                articles.map(({id, title, description, imgUrl, createdAt, createdBy, userId, likes, comments}) => (
                    <div className="eacharticle" key={id}>
                        <img src={imgUrl} alt="Article pics"></img>
                        <div> 
                            <Link to={`/article/${createdBy}/${id}`}><h2>{title} </h2></Link>
                            
                            <p>Created on {createdAt.toDate().toDateString()} by {createdBy}</p>
                            <p className="onlythreelines">{description}</p>
                            {
                                user && user.uid === userId && <DeleteArticle id={id}/>
                            }

                            {
                                user && <LikeArticle id={id} likes={likes} />
                            }
                            <p>{likes?.length} {likes.length > 1 ? "likes" : "like"} and {comments?.length} {comments.length > 1 ? "comments" : "comment"}</p>
                            
                        </div>
                    </div>
                ))
            )
        }
    </div>
  )
}

export default Articles