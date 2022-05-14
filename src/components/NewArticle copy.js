
import { useState } from "react"
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "./../firebaseConfig";
import { toast } from "react-toastify";


function NewArticle() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imgUrl: "",
        createdAt: Timestamp.now().toDate()
    })

    const [progress, setProgress] = useState(0);


    function handleFormData(e) {
        let {name, value} = e.target;
        // console.log(target)
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]:  value
        }))
    }

    function handleImageChange(e)  {
        
        let img = e.target.files[0].name
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

        const storageRef = ref(storage, `/images/${Date.now()}${formData.imgUrl}`);

        // storageRef.put(file, {
        //     contentType: 'image/png',
        // })
        const metadata = {
            contentType: 'image/jpeg',
          };


          const uploadImage = uploadBytes(storageRef, formData.imgUrl, metadata)

        const uploadImg = uploadBytesResumable(storageRef, formData.imgUrl, metadata);

        uploadImg.on("state_changed",
        (snapshot) => {
          const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressPercent);
          console.log(progress)
        },
        (err) => {
          console.log(err);
        },
        () => {
          setFormData({
            title: "",
            description: "",
            imgUrl: "",
          });
          //console.log(formData)
        //   getDownloadURL(uploadImg.snapshot.ref).then((url) => {
            //   url.replace(/C:\\fakepath\\/i, '')
            getDownloadURL(uploadImg.snapshot.ref).then((url) => {
            const articleRef = collection(db, "Articles");
            addDoc(articleRef, {
              title: formData.title,
              description: formData.description,
              imgUrl: url,
              createdAt: Timestamp.now().toDate()
            //   , createdBy:user.displayName,
            //   userId:user.uid,
            //   likes:[],
            //   comments:[]
            })
              .then(() => {
                toast("Article added successfully", { type: "success" });
                setProgress(0);
              })
              .catch((err) => {
                toast("Error adding article", { type: "error" });
              });
          });
        }
        );
    }
  return (
    <div className="newarticle">
        <h2>Create new Article</h2>
        <form onSubmit={handleFormSubmit}>
            <input type="text" name="title" value={formData.title} placeholder="Article Title" onChange={(e) => handleFormData(e)} required/>

            <textarea type="text" name="description" value={formData.description} onChange={(e) => handleFormData(e)} required> </textarea>

            <input type="file" accept="image/*" name="imgUrl" onChange={(e) => handleImageChange(e)} required/>

            {progress === 0 ? null : (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped mt-2"
                style={{ width: `${progress}%` }}
              >
                {`uploading image ${progress}%`}
              </div>
            </div>
          )}

            <button>Submit</button>
        </form>

    </div>
  )
}

export default NewArticle