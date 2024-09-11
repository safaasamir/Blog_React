const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const SignUp = async (req, res) => {
  const { username, password, email } = req.body;
  const hashpassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({
      username,
      password: hashpassword,
      email,
    });
    await newUser.save();
   return res.status(200).json({ Massege: newUser });
  } catch (error) {
    // console.log(error);
   return res.status("400").json({ massege: error });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
    return  res.status(400).send({
        state: "Error",
        message: "Email and password are required",
        data: null,
        code: 500,
      });
    }
    const userDoc = await User.findOne({ email: email });
    if (!userDoc) {
     return res.status(400).send({
        state: "Failed",
        message: "you don't have acount please sign up ",
        data: null,
        code: 400,
      });
    }
    const matchpassword = await bcrypt.compare(password, userDoc.password);

    if (userDoc && matchpassword) {
      const token =  jwt.sign(
        { username: userDoc.username,id:userDoc._id },
        process.env.JWT_SECRET_KEY
      );
     
     return res.status(200).cookie('token',token).json({
      id:userDoc._id,
      username:userDoc.username
     });
    } else {
      res
        .status(400)
        .send({
          state: "Failed",
          message: "the password or email is wrong  ",
          data: null,
          code: 400,
        });
    }
  } catch (error) {
  return  res
      .status(500)
      .send({ state: "error", message: error.message, code: 500, data: null });
  }
};

const getProfile=(req,res)=>{
const {token}=req.cookies
try{
  jwt.verify(token,process.env.JWT_SECRET_KEY,{},(err,info)=>{
  if (err) throw err
  return res.json(info)
})
}catch(error){
   res.status(404).json({massege:"user not found"})
}

}

const logout= (req,res)=>{
    return res.cookie('token','').json("ok")

}
module.exports = { SignUp, Login,getProfile,logout };
