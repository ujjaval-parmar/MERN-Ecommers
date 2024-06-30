
import UserModel from "../../models/userModel.js";
import { errorHandler } from "../../util/error.js";


export const userLogout = async (req, res, next) => {

    try {

        res.clearCookie('token');

        res.status(200).json({
            success: true,
            message: 'User has been signed  out!'
        })


    } catch (err) {
        const error = errorHandler(500, "Error: can not sign out User!", err.message);
        next(error);
    }


}