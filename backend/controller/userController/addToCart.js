import CartModel from "../../models/cartModel.js";
import { errorHandler } from "../../util/error.js";

export const addToCart = async (req, res, next) => {

    try {

        // console.log(req.params.productId)

        const productExistInCart = await CartModel.findOne(
            { $and :{
                productId: req.params.productId,
                userId: req.user.id
            }});

        // console.log(productExistInCart);

        let response;


        if (!productExistInCart) {
            response = await CartModel.create({
                productId: req.params.productId,
                userId: req.user.id,
                quantity: 1 
            });
        } else {
            response = await CartModel.findByIdAndUpdate(productExistInCart._id, {
                quantity: Number(productExistInCart.quantity + 1)
            }, {new: true}); 

        }

        // console.log(response);

        res.status(201).json({
            success: true,
            message: 'Add to Cart Success!',
            data: response
        })

    } catch (err) {
        const error = errorHandler(500, 'Add to Cart Failed!', err.message);
        next(error)
    }



}