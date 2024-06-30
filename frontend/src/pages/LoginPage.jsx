import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userSlice';


const LoginPage = () => {

    const navigate = useNavigate();

    const { user } = useSelector(state=> state.user);

    // console.log(user);

    const dispatch = useDispatch();

    


    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleOnChange = e =>{
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try {
            

            const response = await apiGanerator('signin', 'POST', true, data );

            // console.log(response)

            const responseData = await response.json();

            if (!responseData.success) {
                throw new Error(responseData.error || responseData.message);
            }

            // console.log(responseData);


            toast.success(responseData.message);

            dispatch(setUserDetails(responseData.data));
            
            navigate('/');






        } catch (err) {
          
            toast.error(err.message);

        }



    }

    return (
        <section id='login'>

            <div className='container mx-auto p-4'>

                <div className='bg-white p-4 py-5 w-full max-w-sm mx-auto rounded'>

                    <div className='w-20 h-20 mx-auto '>
                        <img src="signin.gif" alt="login-icon" />
                    </div>

                    <form className='pt-6' onSubmit={handleSubmit}>

                        <div className=''>
                            <label>Email:</label>

                            <div className='bg-slate-100 p-2'>
                                <input type="email" placeholder='Enter Email' className='w-full h-full outline-none bg-transparent' name='email' onChange={handleOnChange} value={data.email} />
                            </div>

                        </div>

                        <div>
                            <label>Password:</label>

                            <div className='bg-slate-100 p-2 flex '>
                                <input type={showPassword ? 'text' : 'password'}placeholder='Enter Password' className='w-full h-full outline-none bg-transparent' name='password' onChange={handleOnChange} value={data.password} />
                                <div className='cursor-pointer text-lg'  onClick={()=> setShowPassword(!showPassword)}>
                                    <span>
                                        {showPassword ? <FaEyeSlash/> : <FaEye />}
                                        
                                    </span>
                                </div>
                            </div>
                            <NavLink to='/forgot-password' className='block w-fit ml-auto hover:underline hover:text-red-600'>
                            Forget Password ?</NavLink>
                        </div>



                        <button className='bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] mx-auto rounded-full hover:scale-105 transition-all block mt-6'>Login</button>

                    </form>

                    <p className='my-5'>Don't have account? 
                        <NavLink to='/sign-up' className='text-red-600 hover:text-red-700 hover:underline ml-2'>
                        Sign Up</NavLink>
                    </p>


                </div>



            </div>


        </section>
    )
}

export default LoginPage