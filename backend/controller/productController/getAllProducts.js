import ProductModel from "../../models/productModel.js";
import { errorHandler } from "../../util/error.js";

export const getAllProducts = async (req, res, next) => {
    try {

        // console.log(req.body)

        const {selectedCategory, sortBy } = req.body;

        let sortDirection;

        if(sortBy?.sort){
            sortDirection  = sortBy.sort === 'lowToHigh' ? 1 : -1;
        }


        // console.log(sortDirection)

        let query;

        if (!selectedCategory || selectedCategory.length <= 0) {
            query =  ProductModel.find()
        } else {
            query =  ProductModel.find({
                category: {
                    $in: selectedCategory
                }
            })
        }

        let categoryProducts;

        if(sortDirection){
             categoryProducts = await query.sort({sellingPrice: sortDirection});
        }else{
            categoryProducts = await query;
        }






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