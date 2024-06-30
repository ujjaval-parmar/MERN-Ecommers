
import { useState } from 'react';
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helper/imageTobase64';
import { apiGanerator } from '../helper/apiGanerator';
import { toast } from 'react-toastify';


const SignUpPage = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePic: ''
    });

    const handleOnChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // setData({ ...data, profilePic });

        try {

            if(data.password !== data.confirmPassword){
                throw new Error('Passwords must Match!');
            }

            

            const response = await apiGanerator('signup', 'POST', false, data);

            // console.log(response)

            const responseData = await response.json();

            if (!responseData.success) {
                throw new Error(responseData.error || responseData.message);
            }

            // console.log(responseData);


            toast.success(responseData.message);

            navigate('/login');


        } catch (err) {
            const error = err.message.startsWith('E11000') ? 'Email Already Exist!' : err.message;
            toast.error(error);

        }


    }

    const handleUploadPic = async (e) => {
        // e.preventDefault();

        const file = e.target.files[0];

        // console.log('file: ', file)

        // console.log('Image: ', await imageToBase64(file))

        const image = await imageToBase64(file);

        setData({ ...data, profilePic: image })


    }

    return (
        <section id='signup'>

            <div className='container mx-auto p-4'>



                <div className='bg-white p-4 py-5 w-full max-w-sm mx-auto rounded'>

                    <div className='w-20 h-20 mx-auto relative overflow-hidden '>
                        <div>
                            <img src={data.profilePic || "signin.gif"} alt="login-icon" className='object-cover' />
                        </div>

                        <form>

                            <label>
                                <div className='text-sm bg-opacity-75  bg-slate-200 py-4 text-center absolute bottom-0 left-0 cursor-pointer'>
                                    Upload Photo
                                </div>
                                <input type="file" required name="" id="" className='hidden' onChange={handleUploadPic} />
                            </label>


                        </form>

                    </div>

                    <form className='pt-6 grid grid-cols-1 gap-4' onSubmit={handleSubmit}>

                        <div className=''>
                            <label>Username:</label>

                            <div className='bg-slate-100 p-2'>
                                <input type="username" placeholder='Enter Username' className='w-full h-full outline-none bg-transparent' name='username' onChange={handleOnChange} value={data.username} required />
                            </div>
                        </div>

                        <div className=''>
                            <label>Email:</label>

                            <div className='bg-slate-100 p-2'>
                                <input type="email" placeholder='Enter Email' className='w-full h-full outline-none bg-transparent' name='email' onChange={handleOnChange} value={data.email} required />
                            </div>

                        </div>

                        <div>
                            <label>Password:</label>

                            <div className='bg-slate-100 p-2 flex '>
                                <input type={showPassword ? 'text' : 'password'} placeholder='Enter Password' className='w-full h-full outline-none bg-transparent' name='password' onChange={handleOnChange} value={data.password} required />
                                <div className='cursor-pointer text-lg' onClick={() => setShowPassword(!showPassword)}>
                                    <span>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}

                                    </span>
                                </div>
                            </div>

                        </div>

                        <div>
                            <label>Confirm Password:</label>

                            <div className='bg-slate-100 p-2 flex '>
                                <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' className='w-full h-full outline-none bg-transparent' name='confirmPassword' onChange={handleOnChange} value={data.confirmPassword} required />
                                <div className='cursor-pointer text-lg' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <span>
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}

                                    </span>
                                </div>
                            </div>

                        </div>



                        <button className='bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] mx-auto rounded-full hover:scale-105 transition-all block mt-6'>Sign Up</button>

                    </form>

                    <p className='my-5'> Have an account?
                        <NavLink to='/login' className='text-red-600 hover:text-red-700 hover:underline ml-2'>
                            Sign In</NavLink>
                    </p>


                </div>



            </div>


        </section>
    )
}

export default SignUpPage