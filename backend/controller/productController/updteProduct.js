
import ProductModel from "../../models/productModel.js";
import { errorHandler } from "../../util/error.js"


export const updateProduct = async(req, res, next)=>{
    try{

        // console.log(req.user);
        // console.log(req.body)

        

        if(req.user.role!=='ADMIN'){
            const error = errorHandler(401, 'You are not Authorize(admin) to Update Product!');
            return next(error);
        }

        const response = await ProductModel.findByIdAndUpdate(req.body.id, req.body, {
            new: true
        });

        // console.log(response)

        

        res.status(200).json({
            success: true,
            message: 'Update Product Success!',
            data: response
        })

    }catch(err){
        const error = errorHandler(500, 'Update Product Failed!', err.message);
        next(error);
    }
}