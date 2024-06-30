import { toast } from "react-toastify";
import { apiGanerator } from "./apiGanerator";

const deleteCartProduct = async (e, productId) => {

    e?.stopPropagation();
    e?.preventDefault();

    // console.log(e, productId);

    try {

        const response = await apiGanerator('deleteCartProduct/' + productId, 'GET', true);

        const responseData = await response.json();


        if(!responseData.success){
            throw new Error(responseData.error || responseData.message);
        }

        toast.success(responseData.message, {
            className: 'mt-14 md:mt-4 w-[95%] md:w-full mx-auto'
        });


        return responseData;




    } catch (err) {
        console.log(err);
        toast.error(err.message);
    }


}

export default deleteCartProduct;