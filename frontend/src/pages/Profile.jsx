import React, { useEffect,useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import './profile.css'
import 'font-awesome/css/font-awesome.min.css';
import Swal from 'sweetalert2';
import axios from '../utils/axios';
import {userDetails} from '../utils/Constants'
import { imageupload } from '../utils/Constants';


function Profile() {

    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [image, setImage] = useState("");

    useEffect(() =>{
        const authTokens = JSON.parse(localStorage.getItem('authTokens'))
        const access = authTokens?.access
          axios
          .get(userDetails,{
            headers: { "Authorization": `Bearer ${access}`},
          })
          .then((response) => {
            console.log(response.data)
            setName(response.data.username);
            setemail(response.data.email);
            console.log(response.data.image)
            setImage(response.data?.image);
          });
    })

    const [fullimage,setfullimage]=useState(true);
    const [isActive,setisActive] = useState(false);
    const [heart,setheart]=useState(true);

    const ImageClick = () =>{
        if(isActive){
            setisActive(false);
            }else{
            setisActive(true);
            }
        }

    const FullImage=()=>{
        if(fullimage){
            setfullimage(false);
            }
            else{
            setfullimage(true);
            }
        }

        const addImage = async () => {
            const { value: file } = await Swal.fire({
              title: "Select image",
              input: "file",
        
              inputAttributes: {
                accept: "image/*",
                "aria-label": "Upload your profile picture",
              },
            });
        
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                Swal.fire({
                  title: "img",
                  imageUrl: e.target.result,
                  imageHeight: 400,
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Update",
                  denyButtonText: `Change`,
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    uploading(file);
                  } else if (result.isDenied) {
                    addImage();
                  }
                });
              };
              reader.readAsDataURL(file);
            }
            function uploading(file) {
                const authTokens = JSON.parse(localStorage.getItem('authTokens'))
                const access = authTokens?.access
                const formData = new FormData();
                formData.append('image', file);
                axios
                    .post(imageupload, formData,{
                        headers: { "Authorization": `Bearer ${access}`,
                    }
                    })
                    .then((response) => {
                    console.log(response)
                    setImage(response.data?.image);
                    // setImage(`localhost:8000${res.data?.image}`);
                    })
                    // .catch((err) => {
                    // console.log(err);
                    // });
            }
          };
          
    const Heart=()=>{
    if(heart){
    setheart(false);
    }
    else{
    setheart(true);
    }
    }

    const imageUrl = `http://127.0.0.1:8000${image}`;
  return (
    <>
    <Navbar/>
    <div className="container-profile">
        <div className={`card ${isActive ? "black" : "" }`}>
            <div className={`top_part ${isActive ? "font_icons" : "" }`}>
                <div className="icons">
                    <i onClick={ImageClick} className="fa fa-moon-o"></i>    
                </div>
            </div>
            <div className={`overlay ${fullimage ? "d-none" : "" }`}>
                <small onClick={FullImage} className="fa fa-close"></small>
                <img src={imageUrl} />
            </div>
            <div className="circle">
                <span onClick={FullImage}><img src={imageUrl} /></span>
                <h3>{name}</h3>
                <h6>{email}</h6>
            </div>
            <hr>
            </hr>
            <div className="button">
                <button onClick={addImage} >Update Image </button>
            </div>
        </div>

    </div>
    </>
  )
}

export default Profile
