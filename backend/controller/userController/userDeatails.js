
import UserModel from "../../models/userModel.js";
import { errorHandler } from "../../util/error.js"

export const userDeatils = async(req, res, next)=>{

    try{

        const response = await UserModel.findById(req.user.id);

        if(!response){
            const error = errorHandler(404, 'User not Found!');
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Get User Details Success!',
            data: response
        })

    }catch(err){
        const error = errorHandler(500, 'Get User Deatils Failed!', err.message);
        next(error);
    }



}