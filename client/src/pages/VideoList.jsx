import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const VideoList = () => {

    const [videoListData, setVideoListData]=useState(null)
    const fecthViedeoData=async()=>{
        try {
            const response= await axios.get("http://localhost:5001/api/video/videodataforinitiallist");
            if(!response){
                throw new Error("Something went wrong in getting response!!");
            }
            console.log(response.data.data);
            setVideoListData(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fecthViedeoData();
    },[])
    if(!videoListData){
        return <div className='w-full h-screen bg-slate-300 bg-opacity-5 flex items-center justify-center'>
        <span className="loading loading-spinner text-primary"></span> 
        <h1>Loding Files..., It can take a few seconds..</h1>
    </div>
    }
  return (
    <div className='w-full h-full flex flex-wrap gap-10 p-2 bg-lime-50 items-center justify-start'>
       {videoListData.map((ele)=>{
        return(
            <Link to={`/videolist/${ele._id}`} key={ele._id} className='w-full md:max-w-60'>
                <div className='w-full flex flex-col items-center justify-center cursor-pointer group bg-slate-50 rounded-md  border-gray-600 border-2' >
                    <div className='bg-slate-50 h-40 w-full p-2 rounded-sm overflow-hidden'>
                        <img src={ele.thumbnailUrl} alt="" className='w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 overflow-hidden' />
                    </div>
                    <h1>{ele.title}</h1>
                </div>
            </Link>
        )
       })}
    </div>
  )
}

export default VideoList