import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyAdmin = (req, res, next) =>{
    // console.log(req.cookies.token);

    const token = req.cookies.token;

    if (!token) {
        const error = errorHandler(403, 'User is not Logged in!')
        return next(error);
    };

    // console.log(process.env.JWT_SECRET)

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            const error = (403, 'Auth Error: Token is not valid!', err.message);
            return next(error);
        }

        // console.log(data);

        if(data.role !== 'ADMIN'){
            if (err) {
                const error = (403, 'Auth Error: You are not Admin!', err.message);
                return next(error);
            }
        }

        req.user = {
            id: data.id,
            email: data.email,
            role: data.role
        }

        next();
    })

    
}