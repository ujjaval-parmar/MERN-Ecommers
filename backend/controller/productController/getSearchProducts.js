
import ProductModel from "../../models/productModel.js";
import { errorHandler } from "../../util/error.js";

export const getSearchProducts = async (req, res, next) => {
    try {

        const { searchQuery } = req.query;


        if (!searchQuery) {
            const error = errorHandler(403, 'Please Search Somethig!');
            return next(error);
        }

        // console.log(searchQuery)

        // const searchProducts = await ProductModel.find({
        //     $or: [

        //         { 
        //             productName: { $regex: searchQuery, $options: 'i' } 
        //         },
        //         { 
        //             category: { $regex: searchQuery, $options: 'i' } 
        //         },
        //         { 
        //             brandName: { $regex: searchQuery, $options: 'i' } 
        //         },

        //     ]
        // });

        const regex = new RegExp(searchQuery, 'i', 'g');

        const searchProducts = await ProductModel.find({
            $or: [
                { productName: regex},
                { category: regex},
                { brandName: regex}
            ]
        })


        // console.log(searchProducts)



        res.status(200).json({
            success: true,
            message: 'Get Search Products Success!',
            data: searchProducts
        })

    } catch (err) {
        const error = errorHandler(500, 'Get Search Products Failed!', err.message);
        next(error);
    }
}