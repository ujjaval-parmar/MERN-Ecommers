import bcrypt from "bcryptjs"



import UserModel from "../../models/userModel.js";
import { errorHandler } from "../../util/error.js"

export const userSignUp = async(req, res, next)=>{


    try{

        // console.log(req.body);

        const { email,  username,  password } = req.body;

        if(!email || !password || !username){
            const error = errorHandler(422, 'All Fields are Required!' );
            return next(error);
        }

        const hasedPassword = await bcrypt.hash(req.body.password, 12);

        const response = await  UserModel.create({...req.body, password: hasedPassword, profilePic: req.body.profilePic || undefined });



        const userData = {...response._doc, password: undefined, role: undefined};

        res.status(200).json({
            success: true,
            message: 'User Sign Up Success!',
            data: userData
        })

    }catch(err){
        const error = errorHandler(500, 'User Sign Up Failed!', err.message);
        next(error);
    }



}