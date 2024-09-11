import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";

import { formatISO9075 } from "date-fns";
import { UserContext } from "../hooks/Usercontext";
import { useContext } from "react";
 
export default function Post(props) {
  const navigate=useNavigate()
  const { update,userInfo } = useContext(UserContext);
  const {
    _id,
    title,
    description,
    image,
    content,
    createdAt,
    user,
    updatedAt,
  } = props;
  
  const handlediv=(id)=>{
    return navigate(`/post/${id}`)
  }
  return (
    <div className="card  w-96 shadow-2xl p-3 cursor-pointer " onClick={()=>{handlediv(_id)}}>
      <figure className="h-44 py-3 ">
        <Link to={`/post/${_id}`}>
          <img
            className="rounded-lg "
            src={"http://localhost:4000/" + image}
            alt="PostImage"
            style={{ height: "160px" }}
          />
        </Link>
      </figure>
      <div className="card-body ps-3">
        <Link to={`/post/${_id}`}>
          <h2 className="card-title">{title}</h2>
        </Link>

        <p>{description}</p>
      </div>
      <div className="  px-3 py-4 flex justify-between">
        <div>
          <p>
            {" "}
            By: <span>{user.username}</span>
          </p>
          {update && update._id === _id ? (
            <time>
              {" "}
              Edit:<span>{formatISO9075(new Date(updatedAt))}</span>{" "}
            </time>
          ) : (
            <time>
              {" "}
              created At:<span>{formatISO9075(new Date(createdAt))}</span>{" "}
            </time>
          )}
        </div>

        <div className="card-actions ">
          <Link
            to={`/post/${_id}`}
            className="btn bg-blue-700 text-white hover:bg-blue-400"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
