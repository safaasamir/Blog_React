const express=require("express")
const {Create, getAllPost,getonePost, DeleteonePost, EditonePost}= require("../controller/posts.controller");

const router = express.Router();

const multer=require("multer")
const uploadMiddleware = multer({ dest: 'uploads/' })

router.post("/create",uploadMiddleware.single('image'),Create)
router.get("/",getAllPost)
router.get("/:id",getonePost)
router.put("/edit/:id",uploadMiddleware.single('image'),EditonePost)
router.delete("/:id",DeleteonePost)
module.exports = router