import ProductModel from "../../models/productModel.js";
import { errorHandler } from "../../util/error.js";

export const uploadProduct = async (req, res, next) => {


    try {

        const response = await ProductModel.create(req.body);

        if (!response) {
            const error = errorHandler(500, 'Upload Product Failed!', err.message);
            return next(error);
        }

        res.status(201).json({
            success: true,
            message: 'Upload Product Success!',
            data: response
        })



    } catch (err) {
        const error = errorHandler(500, 'Upload Product Failed!', err.message);
        next(error)
    }


}