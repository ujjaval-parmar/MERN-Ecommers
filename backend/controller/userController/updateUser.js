import UserModel from "../../models/userModel.js";
import { errorHandler } from "../../util/error.js"


export const updateUser = async(req, res, next)=>{
    try{

        // console.log(req.user);
        // console.log(req.body)

        if(req.user.role!=='ADMIN'){
            const error = errorHandler(401, 'You are not Authorize(admin) to Update users!');
            return next(error);
        }

        const response = await UserModel.findByIdAndUpdate(req.body.id, {...req.body}, {
            new: true
        });

        

        res.status(200).json({
            success: true,
            message: 'Update User Role Success!',
            data: response
        })

    }catch(err){
        const error = errorHandler(500, 'Update User Role Failed!', err.message);
        next(error);
    }
}