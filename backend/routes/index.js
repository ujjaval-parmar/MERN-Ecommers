import express from 'express';


import { userSignUp } from '../controller/userController/userSignUp.js';
import { userSignin } from '../controller/userController/userSignin.js';
import { userDeatils } from '../controller/userController/userDeatails.js';
import { userLogout } from '../controller/userController/userLogout.js';
import { allUsers } from '../controller/userController/allUsers.js';
import { updateUser } from '../controller/userController/updateUser.js';
import { uploadProduct } from '../controller/productController/uploadProduct.js';


import { verifyToken } from '../util/verifyUser.js';
import { verifyAdmin } from '../util/verifyAdmin.js';


import { getProducts } from '../controller/productController/getProducts.js';
import { updateProduct } from '../controller/productController/updteProduct.js';
import { getCategoryProduct } from '../controller/productController/getCategoryProduct.js';
import { getCategoryProducts } from '../controller/productController/getCategoryProducts.js';
import { getProductDeatil } from '../controller/productController/getProductDetail.js';
import { addToCart } from '../controller/userController/addToCart.js';
import { countCartProduct } from '../controller/userController/countCartProduct.js';
import { getCartProducts } from '../controller/userController/getCartProducts.js';
import { descreseCartProduct } from '../controller/userController/DescreseCartProduct.js';
import { deleteCartProduct } from '../controller/userController/deleteCartProduct.js';
import { getSearchProducts } from '../controller/productController/getSearchProducts.js';
import { getAllProducts } from '../controller/productController/getAllProducts.js';



const Router = express.Router();

// User Routes:
Router.post('/signup', userSignUp);
Router.post('/signin', userSignin);

Router.get('/allUsers', verifyToken, allUsers);
Router.get('/userDetails', verifyToken, userDeatils);
Router.get('/userLogout', userLogout);

Router.post('/updateUser', verifyToken, updateUser);



// Product Routes:
// Product Routes:
Router.get('/getProducts', getProducts);
Router.post('/uploadProduct', verifyAdmin, uploadProduct);
Router.get('/getProductDetail/:productId', getProductDeatil);
Router.get('/getCategoryProduct', getCategoryProduct);
Router.get('/getCategoryProducts/:category',  getCategoryProducts);
Router.put('/updateProduct', verifyAdmin, updateProduct);
Router.get('/getSearchProducts/',  getSearchProducts);
Router.post('/getAllProducts/',  getAllProducts);




// User Add to Cart
Router.get('/addToCart/:productId', verifyToken, addToCart);
Router.get('/descreseCartProduct/:productId', verifyToken, descreseCartProduct);
Router.get('/deleteCartProduct/:productId', verifyToken, deleteCartProduct);
Router.get('/countCartProduct/', verifyToken, countCartProduct);
Router.get('/getCartProducts/', verifyToken, getCartProducts);




export default Router;