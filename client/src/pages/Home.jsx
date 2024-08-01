import axios from 'axios';
import React, { useState } from 'react'
import {toast} from 'react-toastify';

const Home = () => {
    const [thumbnail, setThumbnail]=useState(null);
    const [video, setVideo]=useState(null);
    const [formData, setFormData]=useState({title:"", description:"", thumbnail:"", video:""})
    const [loading, setLoading]=useState(false);
    const toggelThumbnail= (e)=>{
        console.log(e.target.value);
        setFormData({...formData,thumbnail:e.target.files[0]})
        const file = e.target.files[0]; // Assuming only one file is selected
        
        if (file) {
            if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
                alert('Please select a valid image file (JPG or PNG).');
                setFormData({...formData,thumbnail:""});
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setThumbnail(reader.result); // Set thumbnail to base64 encoded image
            };
            reader.readAsDataURL(file);
        }

    }
    const toggleVideo = (e) => {
        setFormData({...formData,video:e.target.files[0]})
        const file = e.target.files[0]; // Assuming only one file is selected
        if (file) {
            if (!file.type.match('video/mpeg') && !file.type.match('video/avi') && !file.type.match('video/mp4')) {
                alert('Please select a valid video file (MPEG, AVI, or MP4).');
                setFormData({...formData,video:""})
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setVideo(reader.result); // Set video to base64 encoded video
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        console.log("uploading data...");
        console.log(formData);
        if([formData.title, formData.description].some(field=>field.trim('')==='')){
            alert('All fields are requireds!!');
            return;
        }
        if(formData.thumbnail==="" || formData.video==="" || (!formData?.thumbnail?.files[0] || !formData?.video?.files[0])){
            alert('Both files are required!!');
            return;
        }
        setLoading(true);
        try {
            const response=await axios.post("http://localhost:5001/api/video/uplaodvideo",formData,
                {
                    headers: {
                'Content-Type': 'multipart/form-data'
            },withCredentials:true}
        );
            if(!response?.data){
                throw new Error("Error in fetching!!!");
            }
            console.log(response?.data.data);
            alert("Data uploaded Successfully!!")
        } catch (error) {
            console.log("fetching error ",error);
           alert("error occured!!");
        } 
        setLoading(false);
    }
    if(loading){
        return <div className='w-full h-screen bg-slate-300 bg-opacity-5 flex items-center justify-center'>
            <span className="loading loading-spinner text-primary"></span> 
            <h1>Uploading Files, It can take a few minutes..</h1>
        </div>
    }
  return (
    <div className='w-full h-full p-2 flex flex-col items-center justify-start bg-lime-50'>
        <h1 className='font-medium text-2xl'>Hey There, Welocome To Neonflake Video Library!!</h1>
        <p className='p-3 w-full text-center text-sm text-slate-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quibusdam id incidunt tempora ipsam dicta sint, magni aliquam quod fugit quos esse vero laboriosam distinctio iste labore expedita beatae ullam dolore accusamus aperiam fuga dolorum. Eligendi, facilis necessitatibus fuga aspernatur inventore reprehenderit, nostrum saepe esse, officia laudantium illo earum vel.</p>

        <div className='w-full p-10 h-fit flex flex-col items-center justify-start'>
            <h1 className='font-medium text-xl'>Save a Moment of your Life with us!!</h1>
            <div className='w-full h-full rounded-md border-blue-700 border-2 p-5' onSubmit={handleFormSubmit}>
               <form className='w-full h-full flex flex-col items-start justify-center gap-y-5'>
                   <label className='flex flex-col items-start justify-center gap-y-1'>
                     Title of Your Video * 
                    <input
                        name='title'
                        type="text"
                        placeholder="Type your Video Title"
                        className="input input-bordered input-primary w-full md:w-80 max-w-xs" onChange={(e)=>setFormData({...formData,title:e.target.value})}/>
                   </label>

                   <label className='flex flex-col items-start justify-center w-full md:max-w-3xl gap-y-1'>
                     Descirption of Your Video * 
                     <textarea name='description' className="textarea textarea-primary w-full" placeholder="Type the Video Description" onChange={(e)=>setFormData({...formData,description:e.target.value})}/>
                   </label>

                   <label className='flex flex-col items-start justify-center w-full  gap-y-1'>
                     Upload Thumbnail of Your Video * 
                     {!thumbnail ? <div className='w-full flex items-center justify-center flex-col bg-slate-50 rounded-md cursor-pointer  p-2'>
                         <img src='https://cdn3d.iconscout.com/3d/premium/thumb/upload-file-3d-icon-download-in-png-blend-fbx-gltf-formats--document-doc-and-folder-pack-files-folders-icons-5231763.png?f=webp'
                            className='w-[30%]'
                         />
                         <h1 className='text-slate-500'>Drag or Click to upload your Thumbnail</h1>
                     </div> : <div className='w-full flex items-center justify-center flex-col bg-slate-50 rounded-md cursor-pointer  p-2'>
                         <img src={thumbnail}
                            className='w-[30%]'
                         />
                         <h1 className='text-slate-500'>Drag or Click to Change your Thumbnail</h1>
                     </div> 
                     }
                     <input type='file' accept=".jpg, .png" name='thumbnail' className='hidden' onChange={(e)=>toggelThumbnail(e)}/>
                   </label>

                   <label className='flex flex-col items-start justify-center w-full  gap-y-1'>
                     Upload your Video * 
                     {!video ? <div className='w-full flex items-center justify-center flex-col bg-slate-50 rounded-md cursor-pointer  p-2'>
                         <img src='https://cdn3d.iconscout.com/3d/premium/thumb/upload-file-3d-icon-download-in-png-blend-fbx-gltf-formats--document-doc-and-folder-pack-files-folders-icons-5231763.png?f=webp'
                            className='w-[30%]'
                         />
                         <h1 className='text-slate-500'>Drag or Click to upload your video</h1>
                     </div> : <div className='w-full flex items-center justify-center flex-col bg-slate-50 rounded-md cursor-pointer  p-2'>
                         <video src={video} controls
                            className='w-[30%] h-full z-50'
                            accept=".mpeg, .avi, .mp4"
                         />
                         <h1 className='text-slate-500'>Drag or Click to Change your video</h1>
                     </div> 
                     }
                     <input type='file' name='video' className='hidden' onChange={(e)=>toggleVideo(e)}/>
                   </label>
                   
                   <input type="submit" className='btn btn-ghost bg-gray-900 text-white' value="Upload" />

               </form>
            </div>

        </div>
    </div>
  )
}

export default Home