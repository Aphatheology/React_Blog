
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { ref } from 'firebase/storage'
import { onValue } from 'firebase/database'
import React from 'react'
import { db } from '../firebaseConfig'
//import { toast } from "react-toastify";
import cloudinary from "cloudinary/lib/cloudinary";
// import { v2 as cloudinary } from 'cloudinary'
// import { v2 as cloudinary } from 'cloudinary'
//const cloudinary = require("cloudinary").v2;
// import {AdvancedImage} from '@cloudinary/react';
// import {Cloudinary} from "@cloudinary/url-gen";
 
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUD_NAME,
  api_key: process.env.REACT_APP_API_KEY,
  api_secret: process.env.REACT_APP_API_SECRET
});

function DeleteArticle({id}) {
    const handleDelete = async () => {
        const docRef = doc(db, "Articles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let imgId = docSnap.data().imgPublicId
            if(imgId) {
                cloudinary.v2.uploader.destroy(imgId, function(error,result) {
                    console.log(result, error, ) })
                    .then(resp => console.log(resp))
                    .catch(_err=> console.log("Something went wrong, please try again later."));
            }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");

        }

        await deleteDoc(doc(db, "Articles", id))    
    }
  return (
    <button onClick={handleDelete}>Delete Article</button>
  )
}

export default DeleteArticle