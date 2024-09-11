import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../hooks/Usercontext";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["link", "image"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ header: [1, 2, false] }],
    ["clean"],
  ],
};

const format = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function CRUD() {
  const { update, setUpdate } = useContext(UserContext);
  const { id } = useParams();
  const mode = !id ? "add" : "edit";
  const [load, setLoading] = useState(true);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [content, setContent] = useState("");

  useEffect(() => {
    if (mode === "edit") {
      // console.log(id);
      async function fetchData() {
        try {
          const res = await axios.get(`http://localhost:4000/posts/${id}`);
          // console.log(res.data.image);
          setForm({
            title: res.data?.title,
            description: res.data?.description,
            image: res.data?.image,
          });
          setContent(res.data?.content);
          setLoading(false);
        } catch (err) {
          // console.error("Failed to fetch post:", err);
          alert("Failed to load post data.");
        }
      }
      fetchData();
    }
    if(mode==="add"){
      setLoading(false)
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!form.title || !form.description || !form.image || !content) {
      alert("All fields are required!");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (form.image && !allowedTypes.includes(form.image.type)) {
      alert("Please upload a valid image file (JPEG, PNG, or jpg)");
      return;
    }
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("image", form.image);
    formData.append("content", content);

    try {
      const response = await axios.post(
        "http://localhost:4000/posts/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setLoading(false);
        navigate("/");
      }
    } catch (err) {
      // console.error(err);
      setLoading(false);
      alert(
        "Something went wrong! description or title is long . Please try again."
      );
    }
  };

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("image", form.image);
    formData.append("content", content);
    formData.append("id", id);

    if (!form.title || !form.description || !form.image || !content) {
      alert("All fields are required!");
      return;
    }

  

    try {
      const response = await axios.put(
        `http://localhost:4000/posts/edit/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setUpdate(response.data.postdoc);
        setLoading(false);

        navigate(`/post/${id}`);
      }
    } catch (err) {
      // console.error(err);
      setLoading(false);
      alert(
        "Something went wrong! description or title is long, or img not (jpg,png,jpeg), Please try again,and be sure you login"
      );
    }
  };
  // console.log(update)
  //  console.log(update)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "add") {
      handleCreate();
    } else {
      handleEdit();
    }
  };
  if (load) {
    return (
      <section
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <img src="/loading.svg" />
      </section>
    );
  }

  return (
    <div
      style={{ height: "100vh" }}
      className="flex justify-center items-center"
    >
      <div
        className=" border flex items-start justify-center flex-col px-6 border-black rounded-lg py-7  shadow-2xl"
        style={{ width: "600px" }}
      >
        <h2 className="text-4xl my-3 ">
          {mode === "add" ? "Create Post" : "Edit Post"}
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-96 bg-transparent mt-5"
            value={form.title}
            onChange={handleChange}
            name="title"
          />

          <input
            type="text"
            placeholder="Description"
            className="input input-bordered w-96 bg-transparent my-5"
            value={form.description}
            onChange={handleChange}
            name="description"
          />

          <label className="text-blue-700 me-2 mt-9">
            <input
              type="file"
              name="image"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />
          </label>
          <ReactQuill
            className="my-7 h-20"
            modules={modules}
            formats={format}
            value={content}
            onChange={(newValue) => setContent(newValue)}
          />
          <input
            type="submit"
            className="btn btn-primary text-yellow-50 mt-14 hover:bg-blue-400"
            value={mode === "add" ? "Create Post" : "Update Post"}
          />
          <input
            type="submit"
            className="btn bg-transparent text-black-50 mt-2 hover:bg-blue-400"
            value="Cancel"
            onClick={() => {
              mode === "add" ? navigate("/") : navigate(`/post/${id}`);
            }}
          />
        </form>
      </div>
    </div>
  );
}
