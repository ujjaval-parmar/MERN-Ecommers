import ProductModel from "../../models/productModel.js";
import { errorHandler } from "../../util/error.js";


export const getProductDeatil = async(req, res, next)=>{
    try{

        const {productId} = req.params;

        

        const response = await ProductModel.findById(productId);

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