
import { apiGanerator } from './apiGanerator';
import { toast } from 'react-toastify';

const fetchCategoryWiseProducts = async(category) => {
   

        try {
            

            const response = await apiGanerator('getCategoryProducts/' + category, 'GET', true);

            const responseData = await response.json();

            // console.log(responseData);

            
            return responseData.data;




        } catch (err) {
            toast.error(err.message);
        } 



    
}

export default fetchCategoryWiseProducts