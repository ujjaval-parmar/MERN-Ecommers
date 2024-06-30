import mongoose from 'mongoose';


const CartSchema = new mongoose.Schema({

    productId: {
        ref: 'product',
        type: String
    },
    quantity: Number,
    userId: String


}, { timestamps: true });

const CartModel =   mongoose.model('cart', CartSchema);

export default CartModel;