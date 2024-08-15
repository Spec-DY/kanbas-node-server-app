import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  name: { type: String,},
  description: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel"}, 
  lessons: [
    {
        id:{type:String},
        name: { type: String},
        description: { type: String},
        module:{type:String}
    }
  ]
}, { collection: "modules" });

export default moduleSchema;
