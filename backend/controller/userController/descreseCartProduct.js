import CartModel from "../../models/cartModel.js";
import { errorHandler } from "../../util/error.js";

export const descreseCartProduct = async (req, res, next) => {

    try {

        // console.log(req.params.productId)

        const productExistInCart = await CartModel.findOne(
            { $and:{
                productId: req.params.productId,
                userId: req.user.id
            } });

        // console.log(productExistInCart);

        let response;


        if (productExistInCart.quantity===1) {
            response = await CartModel.findByIdAndDelete(productExistInCart._id );
        } else {
            response = await CartModel.findByIdAndUpdate(productExistInCart._id, {
                quantity: Number(productExistInCart.quantity - 1)
            }, {new: true}); 

        }

        // console.log(response);

        res.status(201).json({
            success: true,
            message: 'Decrese from Cart Success!',
            data: response
        })

    } catch (err) {
        const error = errorHandler(500, 'Decrese from Cart Failed!', err.message);
        next(error)
    }



}