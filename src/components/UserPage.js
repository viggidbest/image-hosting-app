import React from 'react'
import UserCss from'../styles/UserPage.module.css'
import { useState } from 'react';
import axios from "axios"
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function UserPage(props) {
  const apiKey = Cookies.get('apiKey');
  const {state} = useLocation();
const { email } = state;
console.log(email);
console.log("does this rerender");
  const [postImage, setPostImage] = useState( { image : ""})

  const [response, setResponse] = useState("");
  const [rend,setRend] = useState(false)
  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const createPost = async (newImage) => {
    try{
      await axios.post("http://localhost:3001/user-page/upload", newImage)
    }catch(error){
      console.log(error)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage)
    console.log("Uploaded")
    
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setPostImage({ ...postImage, image : base64 })
  }

  async function handleClick () {
      
    try {
        const response = await axios.post("http://localhost:3001/user-page/show-images",{headers:{Authorization:`Bearer ${apiKey}`}})
        setResponse(response.data)
        // console.log(response[2].image);
        setRend(true)
    } catch (err) {
        console.log(err)
    }
      

      
      
  }
  return (
    <div className={UserCss.main}>

        <div className={UserCss.nav}>
          
              {/* <label htmlFor="image">Choose File</label> */}
              <div className={UserCss.fileinput}>
              <input multiple onChange={handleFileUpload} type="file" id="image" name="image" value="" required />
             <button onClick={handleSubmit}>Submit</button>
              </div>
             
             <button className={UserCss.button} onClick={handleClick}>List your images</button>

        </div>
      <div className={UserCss.main}> 
          <div className={UserCss.imagecontainer}>
          {rend ? response.map((item)=>(
            
              <img className={UserCss.image}src={item.image}></img>
              
            )) : ""
           
            }
            
          </div>
            

       </div>
    </div>
  )
}

export default UserPage