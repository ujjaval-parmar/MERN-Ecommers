import React, { useState } from 'react'

import { IoMdClose } from 'react-icons/io'
import { toast } from 'react-toastify';
import { apiGanerator } from '../helper/apiGanerator';

const ChangeUserRole = ({id, name, email, role, onClose, callFunc}) => {

    const [userRole, setUserRole] = useState(role || '');

    const updateUserRole = async() =>{

        try{

            const body = {id, role: userRole}

            const response = await apiGanerator('updateUser', 'POST', true, body);

            const responseData = await response.json();

            if(!responseData.success){
                throw new Error(responseData.error || responseData.message);
            }

            // console.log(responseData);

            onClose();

            toast.success('User Updated SuccessFull!');
            callFunc();


        }catch(err){
            console.log(err);
            toast.error(err.message);
        }


    }

    return (
        <div className='absolute top-0 left-0 bottom-0 right-0 w-full h-full z-10 flex items-center justify-between bg-slate-200/70'>

            <div className='w-full mx-auto bg-white shadow-md p-4 max-w-sm flex flex-col gap-4 relative'>

                <button className='block ml-auto text-lg' onClick={onClose}>
                    <IoMdClose />
                </button>

                <h2 className='pb-4 text-lg font-medium'>Change User Role</h2>

                <p>Name: {name || ''}</p>
                <p>Email: {email || ''}</p>

                <div className='flex items-center gap-4'>
                    <p>Role:</p>
                    <select className='border px-3 py-1' value={userRole} onChange={(e)=> setUserRole(e.target.value)}>
                        <option value={'ADMIN'}>Admin</option>
                        <option value={'GENERAL'}>General</option>
                    </select>
                </div>

                <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-800' onClick={updateUserRole}>Change Role</button>

            </div>


        </div>
    )
}

export default ChangeUserRole