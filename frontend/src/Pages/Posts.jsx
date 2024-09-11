import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Post from "../Components/Post";
import { UserContext } from "../hooks/Usercontext";
import { Link, useNavigate } from "react-router-dom";
import Add from "../icons/Add";
import MyLoader from "../icons/Loader";

export default function Posts() {
  const [load, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate=useNavigate()
  
 // console.log(userInfo)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/posts");
        setPost(res.data);
        setLoading(false);
      } catch (error) {
        // console.error("Error fetching posts:", error);
        
        setLoading(false);
      
        
      }
    };
    
    fetchPosts();
  }, []);

  if (load) {
    return <section style={{ height:"100vh" }}><MyLoader/></section>
   
      
    

  }
  // console.log(post.length);
  const username = userInfo?.username;
  return (
    <div className="relative min-h-screen px-10" >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4" >
        {post.length > 0 && post.map((posts) => <Post key={posts._id} {...posts} />)}
      </div>
      {username && (
        <div className="absolute bottom-5 right-4 p-4 bg-blue-700 text-white rounded-lg hover:bg-blue-400" onClick={()=>{navigate("/post/add")}}>
          <Link to={"/post/add"} className="w-10 h-8 flex items-center justify-center">
            <Add />
          </Link>
        </div>
      )}
    </div>
  );
};

