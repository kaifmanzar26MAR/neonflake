import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {
    const {_id}=useParams();
    const [videoData, setVideoData]=useState(null);
    console.log(_id);

    const fetchVideoData=async()=>{
        try {
            const response= await axios.get(`http://localhost:5001/api/video/videodata/${_id}`);
            if(!response){
                throw new Error("not got the response!!");
            }
            console.log(response.data.data);
            setVideoData(response.data.data);
        } catch (error) {
            console.log("error ", error);
        }
    }
    
    useEffect(()=>{
        window.scroll({
            top:0
        })
        fetchVideoData();
    },[])

    if(!videoData || !_id){
        return <div className='w-full h-screen bg-slate-300 bg-opacity-5 flex items-center justify-center'>
        <span className="loading loading-spinner text-primary"></span> 
        <h1>Loding Files..., It can take a few seconds..</h1>
    </div>
    }

    const {title, description, videoUrl, thumbnailUrl, createdAt, updatedAt}=videoData;
  return (
    <div className='w-full min-h-screen p-8 bg-lime-50 flex flex-col gap-5 items-start justify-start'>
        <h1 className='w-full text-wrap font-medium text-3xl'>Title : {title}</h1>
        <div className='w-full  flex items-center justify-center'>
            <video src={videoUrl} controls autoPlay className='w-full h-fit'/>
        </div>
        <p className='p-3 w-full text-sm text-slate-500'>{description}</p>
    </div>
  )
}

export default PlayVideo