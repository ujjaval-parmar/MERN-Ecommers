import UserModel from "../../models/userModel.js";
import { errorHandler } from "../../util/error.js"


export const allUsers = async(req, res, next)=>{

    try{

        if(!req.user.role==='admin'){
            const error = (401, 'Yur are not Authorize(admin) to get all users!');
            return next(error);
        }

        const response = await UserModel.find();

        
        res.status(200).json({
            success: true,
            message: 'Get All Users Success!',
            data: response
        })

    }catch(err){
        const error = errorHandler(500, 'Get All Users Failed!', err.message);
        next(error);
    }



}