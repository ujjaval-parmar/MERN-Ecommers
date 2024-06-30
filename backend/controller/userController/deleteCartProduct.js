import CartModel from "../../models/cartModel.js";
import { errorHandler } from "../../util/error.js";

export const deleteCartProduct = async (req, res, next) => {

    try {

        // console.log(req.params.productId)

        const productExistInCart = await CartModel.findOne(
            {
                $and: {
                    productId: req.params.productId,
                    userId: req.user.id
                }
            });

        // console.log(productExistInCart);

        let response;



        response = await CartModel.findByIdAndDelete(productExistInCart._id);


        // console.log(response);

        res.status(201).json({
            success: true,
            message: 'Delete from Cart Success!',
            data: response
        })

    } catch (err) {
        const error = errorHandler(500, 'Delete from Cart Failed!', err.message);
        next(error)
    }



}