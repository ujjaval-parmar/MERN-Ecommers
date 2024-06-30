import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"



import UserModel from "../../models/userModel.js";
import { errorHandler } from "../../util/error.js";

export const userSignin = async(req, res, next)=>{

    try{

        // console.log(req.body);

        const { email,  password } = req.body;

        if(!email || !password ){
            const error = errorHandler(422, 'All Fields are Required!' );
            return next(error);
        }

        const userExists = await UserModel.findOne({email});

        if(!userExists){
            const error = errorHandler(404, 'Email is Invalid!');
            return next(error);
        }

        // console.log(userExists);

        const hasedPassword = await bcrypt.compare(req.body.password, userExists.password);

        if(!hasedPassword){
            const error = errorHandler(404, 'Password is Invalid!');
            return next(error);
        }


        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign({
            id: userExists._id,
            role: userExists.role,
            email: userExists.email
        }, process.env.JWT_SECRET, { expiresIn: age });
        
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: age,
            SameSite: 'lax',
            // domain: "localhost",
            // secure: true
        });

        const userData =  {...userExists._doc, password: undefined};


        res.status(200).json({
            success: true,
            message: 'User Signin Success!',
            data: userData
        })

    }catch(err){
        const error = errorHandler(500, 'User Signin Failed!', err.message);
        next(error);
    }


}