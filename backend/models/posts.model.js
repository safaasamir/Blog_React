const { Schema ,mongoose} = require("mongoose");

const PostShema = new Schema({
  title: { type: String, require: true, minlength: 3, maxlength: 50 },
  description: { type: String, require: true, minlength: 3, maxlength: 120 },
  image: {
    type: String,
    require: true,
  },
  content:String,
  user:{type:Schema.Types.ObjectId,ref:'User'}
},{
  timestamps:true
});

module.exports =mongoose.model("Post",PostShema)