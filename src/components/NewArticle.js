
import { useRef, useState } from "react"
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "./../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
//import { toast } from "react-toastify";


function NewArticle() {
    const [user] = useAuthState(auth)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imgUrl: "",
        createdAt: Timestamp.now().toDate()
    })

    const ref = useRef();


    function handleFormData(e) {
        let {name, value} = e.target;
        // console.log(target)
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]:  value
        }))
    }

    function handleImageChange(e)  {
        
        let img = e.target.files[0]
        // console.log(img)
        setFormData(prevFormData => ({ ...prevFormData, imgUrl: img }));
        // console.log(formData)
      };

    function handleFormSubmit(e) {
        e.preventDefault();
        if(!formData.title || formData.title.trim() === "" || !formData.description ||formData.description.trim() === ""  || !formData.imgUrl) {
            alert("Please fill all the fields")
            return;
        }

        const data = new FormData()
        data.append("file", formData.imgUrl)
        data.append("upload_preset", "article")
        data.append("cloud_name","aphatheology")
        fetch("https://api.cloudinary.com/v1_1/aphatheology/image/upload", {
        method:"post", 
        body: data
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            const articleRef = collection(db, "Articles");
            addDoc(articleRef, {
              title: formData.title,
              description: formData.description,
              imgUrl: data.url,
              createdAt: Timestamp.now().toDate(),
              createdBy: user.displayName,
              userId: user.uid,
              likes: [ ],
              comments: [],
              imgPublicId: data.public_id
            })
            // setFormData({
            //     title: "",
            //     description: "",
            //     imgUrl: ""
            //   });
           
        })
        .then(() => {
            setFormData({
              title: "",
              description: "",
              imgUrl: "",
            });
            ref.current.value = "";
        })
        .catch(err => console.log(err))

        // (() => {
        //     setFormData({
        //       title: "",
        //       description: "",
        //       imgUrl: "",
        //     });
        // })
    }
  return (
    <div className="newarticle">
        {
            !user ?
            <>
                <p>
                    <Link to="/login">Login</Link> to create new Article. <br />
                    Don't have an account? <Link to="/register">Register </Link>
                </p>
            </> :
            <>
                <h2>Create new Article</h2>
                <form onSubmit={handleFormSubmit}>
                    <input type="text" name="title" value={formData.title} placeholder="Article Title" onChange={(e) => handleFormData(e)} required/>

                    <textarea type="text" name="description" value={formData.description} onChange={(e) => handleFormData(e)} required> </textarea>

                    <input type="file" accept="image/*" name="imgUrl" onChange={(e) => handleImageChange(e)} ref={ref} required/>

                    <button>Submit</button>
                </form>
            </>
        }

    </div>
  )
}

export default NewArticle