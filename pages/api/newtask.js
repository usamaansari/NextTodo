import {checkAuth, connectDB} from "../../utils/features";
import { Task } from "../../models/task";
import {ObjectId} from 'mongodb';
import { asyncError, errorHandler } from "../../middlewares/error";

const handler = asyncError(async(req, res) => {
   // const newObjectId = new ObjectId();
    if(req.method !== "POST"){
        return res.status(400).json({
            success: false,
            message: "Only Post Method is allowed",
        })
    }

   
await connectDB();
const { title, description } = req.body;

if (!title || !description)
  return errorHandler(res, 400, "Please Enter All fields");

const user = await checkAuth(req);

if (!user) return errorHandler(res, 401, "Login First");

await Task.create({
    title,
    description,
    user: user._id,
});
    res.json({
        success: true,
        message: "Task Created",
    })

})

export default handler;