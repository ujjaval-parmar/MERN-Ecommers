import React, { useEffect } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminPanel = () => {


  const navigate = useNavigate();


  const { user } = useSelector(state => state?.user);

  useEffect(()=>{

    if(user?.role !== 'ADMIN'){
      navigate('/login');
    }

  }, [user]);


  return (
    <div className='flex flex-col md:flex-row -pt-4 '>

      <aside className='bg-white w-full min-h-full lg:max-w-60 customShadow pt-5 -mt-5 '>

        <div className='h-32 flex flex-col items-center justify-center'>
          <div className='text-5xl cursor-pointer'>
            {user ? <img src={user?.profilePic} alt={user?.username} className="w-20 h-20 rounded-full" /> : <FaRegCircleUser />}
          </div>

          <p className='capitalize text-lg font-semibold'>{user?.username}</p>
          <p className='text-sm'>{user?.role}</p>

        </div>

        <div className='grid '>

          <NavLink to='all-users' className='px-2 py-1 hover:bg-slate-100'>
            All Users
          </NavLink>

          <NavLink to='all-products' className='px-2 py-1 hover:bg-slate-100'>
            All Products
          </NavLink>



        </div>

      </aside>

      <main className='w-full h-full p-2'>
        <Outlet />
      </main>


    </div>
  )
}

export default AdminPanel