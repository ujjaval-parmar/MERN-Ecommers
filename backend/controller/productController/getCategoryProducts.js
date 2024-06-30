import ProductModel from "../../models/productModel.js";
import { errorHandler } from "../../util/error.js";


export const getCategoryProducts = async (req, res, next) => {
    try {

        // console.log(req.params);

        const { category } = req.params;





        const categoryProducts = await ProductModel.find({
            category: {
                $in: category
            }
        })


        res.status(200).json({
            success: true,
            message: 'Get Category Products Success!',
            data: categoryProducts
        });



    } catch (err) {
        const error = errorHandler(500, 'Get Category Products Failed!', err.message);
        next(error)
    }
}