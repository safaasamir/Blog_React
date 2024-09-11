import BHeader from "./Components/BHeader";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./Components/Footer";
import Error from "./Pages/Error";

import CRUD from "./Pages/CRUD";
import Posts from "./Pages/Posts";
import PostDetails from "./Pages/PostDetails";


function App() {
  
  const location = useLocation();
  const hideHeader =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.includes("/post");
  return (
    <>
      {hideHeader && <BHeader />}
  
   
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route path="/post/add" element={<CRUD />} />
        <Route path="/post/edit/:id" element={<CRUD />} />

        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="*" element={<Error />} />
      </Routes>
      
      {hideHeader && <Footer />}
    </>
  );
}

export default App;
