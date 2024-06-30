import ProductModel from "../../models/productModel.js";
import { errorHandler } from "../../util/error.js";


export const getCategoryProduct = async (req, res, next) => {
    try {

        const productCategorys = await ProductModel.distinct("category");


        // console.log(productCategorys);

        const productByCategory = [];

        
        // console.log(productByCategory);

        for(const category of productCategorys){
            const product = await ProductModel.findOne({category});

            if(!product){
                return;
            }

            productByCategory.push(product);
        }


        res.status(200).json({
            success: true,
            message: 'Get  Product Category Success!',
            data: productByCategory
        })



    } catch (err) {
        const error = errorHandler(500, 'Get Product Category Failed!', err.message);
        next(error)
    }
}