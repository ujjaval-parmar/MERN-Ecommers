import CartModel from "../../models/cartModel.js";
import { errorHandler } from "../../util/error.js";

export const countCartProduct = async(req, res, next)=>{

    try{

        const response = await CartModel.countDocuments({userId: req.user.id});

        res.status(200).json({
            success: true,
            message: 'Get Count Cart Products Success!',
            data: response
        })



    }catch(err){
        const error = errorHandler(500, 'Get Count Cart Products Failed!', err.message);
        next(error)
    }



}