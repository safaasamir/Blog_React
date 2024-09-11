import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {formatISO9075} from "date-fns"
import { UserContext } from '../hooks/Usercontext';
import Edit from '../icons/Edit';
import Delete from '../icons/Delete';
import MyLoader from '../icons/Loader';
export default function PostDetails() {
    const [post, setPost] = useState(null);
    const [load, setLoading] = useState(true);
    const {id}= useParams()
    const { setUserInfo, userInfo,update } = useContext(UserContext);
    const navigate = useNavigate(); 
    useEffect(()=>{
     async function fetchdata(){
        try{
             const responce= await axios.get(`http://localhost:4000/posts/${id}`)
        setPost(responce.data)
        setLoading(false);
        }catch(err){
            // console.log(err)
            setLoading(false);
        }
       
     }
     fetchdata()
    
     
    },[])

    const handleDelete = async (id) => {
       
     const check= confirm("you sure you want delete the post ")
  if(check){
     try {
        const response = await axios.delete(`http://localhost:4000/posts/${id}`, {
          withCredentials: true,
        });
  
        if (response.status === 200) {
          navigate(`/`);
        } else {
          alert("Failed to delete the post. Please try again.");
        }
      } catch (err) {
        // console.error(err);
        alert("Something went wrong. Please try again.");
      }
  }
     
    };
   
    if (load) {
        return <section style={{ height:"100vh" }}><MyLoader/></section>
      }
      
  return (
    <div className=' px-10 ' >
   
    <div className=" shadow-2xl my-10 py-5 border border-black " >
  <figure className=' rounded flex items-center justify-center xl:ps-4 sm:ps-0 sm:items-start'>
    <img
      src={`http://localhost:4000/${post.image}` }
      alt="Album"
     className='h-96 '
      />
  </figure>
  <div className="card-body ">
    <h1 className=" text-center text-2xl bold mb-0">{post.title}</h1>
    {update && update._id=== post._id?<span className='text-center my-0 text-gray-600' > Edit: {formatISO9075(new Date(post.updatedAt))}</span>:
    <span className='text-center my-0 text-gray-600' > Create: {formatISO9075(new Date(post.createdAt))}</span>
  }
    
    
    <p className='text-center my-0 '>by:{post.user.username}</p>
    <hr/>
    <p>{post.description}</p>
    <div dangerouslySetInnerHTML={{ __html:post.content }}/>
     
    
    <div className="card-actions justify-end">
    {userInfo.id===post.user._id &&
        <>
       <Link to={`/post/edit/${post._id}`} className="btn btn-primary hover:bg-blue-400"><Edit/>Edit</Link>
      <button className="btn text-red-500 bg-transparent hover:bg-red-500 hover:text-white" onClick={()=>handleDelete(post._id)}><Delete/>Delete</button>
      </>
    }
      
    </div>
  </div>
</div>
</div>
  )
}
