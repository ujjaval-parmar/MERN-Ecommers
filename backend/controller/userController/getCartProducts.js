import CartModel from "../../models/cartModel.js";
import { errorHandler } from "../../util/error.js";

export const getCartProducts = async(req, res, next)=>{
     try{

        if(!req.user.id){
            const error = errorHandler(404, 'Plese Login Again');
            return next(error);
        }

        const userCartProducts = await CartModel.find({userId: req.user.id}).populate('productId');




        res.status(200).json({
            success: true,
            message: 'Get Cart Products Success!',
            data: userCartProducts
        })

    }catch(err){
        const error = errorHandler(500, 'Get Cart Products Failed!', err.message);
        next(error);
    }
}