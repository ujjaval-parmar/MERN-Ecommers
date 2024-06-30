import ProductModel from "../../models/productModel.js";
import { errorHandler } from "../../util/error.js";


export const getProducts = async(req, res, next)=>{
    try{

        const response = await ProductModel.find().sort({ createdAt: -1});

        res.status(200).json({
            success: true,
            message: 'Get  Products Success!',
            data: response
        })



    }catch(err){
        const error = errorHandler(500, 'Get Products Failed!', err.message);
        next(error)
    }
}