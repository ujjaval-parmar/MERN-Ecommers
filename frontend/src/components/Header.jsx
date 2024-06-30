import Logo from './Logo'

import { GrSearch } from 'react-icons/gr'
import { FaShoppingCart } from 'react-icons/fa'
import { FaRegCircleUser } from 'react-icons/fa6'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { apiGanerator } from '../helper/apiGanerator'
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice'
import { useContext, useState } from 'react'
import Context from '../context/context'

const Header = () => {

    const navigate = useNavigate();

    const { user } = useSelector(state => state?.user);

    const { cartCount, getUserCartProductCount} = useContext(Context);

    

    const dispatch = useDispatch();

    const searchInput = useLocation();

    const [search, setSearch] = useState(searchInput?.search.split('=')[1]);

    console.log(search);


    const handleLogout = async () => {

        try {
            const response = await apiGanerator('userLogout', 'GET', true);

            const responseData = await response.json();

            if (!responseData.success) {
                throw new Error(responseData.error || responseData.message);
            }

            toast.success(responseData.message);

            dispatch(setUserDetails(null));

        } catch (err) {
            toast.error(err.message);
        }

    }


    const handleSearch = async(e) =>{
        const { value } = e.target;
        // console.log(value)

        if(value){
            navigate('/search?query='+value);
        }
    }




    return (
        <header className='h-16 shadow-md bg-white fixed top-0 left-0 w-full z-50'>

            <div className="container mx-auto h-full flex items-center px-4 justify-between">

                <div>
                    <NavLink to='/'>
                        {/* <Logo w={90} h={50} /> */}
                        <img src="/0000.png" alt="" width={50} heights={40} />
                    </NavLink>
                </div>


                <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
                    <input type="text" placeholder='Search Product here...' className='w-full outline-none ' onChange={handleSearch} defaultValue={search?.length >= 2 ? search :  ''} />
                    <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                        <GrSearch />
                    </div>
                </div>



                <div className='flex items-center gap-7'>

                    <div className='relative group flex justify-center'>

                        {user && <div className='text-3xl cursor-pointer'>
                            {(user?.profilePic) ? <img src={user?.profilePic} alt={user?.username} className="w-8 h-8 rounded-full" /> : <FaRegCircleUser />}
                        </div>}

                        {user?.role === 'ADMIN' ? <div className='invisible hidden md:block group-hover:visible absolute bg-white bottom-0 top-8 h-fit p-3 shadow-lg rounded-md'>
                            <nav>
                                <NavLink to='/admin-panel/all-products' className='whitespace-nowrap hover:bg-slate-100 p-2'>Admin Panel</NavLink>
                            </nav>
                        </div> : ''}


                    </div>

                    {user && <div className='text-2xl relative' onClick={()=> navigate('/cart')}>
                        <span><FaShoppingCart /></span>
                        <div className='bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-1 -right-4'>
                            <p className='text-sm '>{cartCount}</p>
                        </div>
                    </div>}

                    <div>
                        {user ?
                            <button className='px-3 py-1 bg-red-600 rounded-full hover:bg-red-700' onClick={handleLogout}>Logout</button>
                            : <NavLink to={'login'} className='px-3 py-1 bg-red-600 rounded-full hover:bg-red-700'>Login</NavLink>
                        }
                    </div>

                </div>

            </div>


        </header>
    )
}

export default Header