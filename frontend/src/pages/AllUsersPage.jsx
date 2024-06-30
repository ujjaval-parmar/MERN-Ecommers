import React, { useEffect, useState } from 'react'
import { apiGanerator } from '../helper/apiGanerator';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import ChangeUserRole from '../components/ChangeUserRole';


const AllUsersPage = () => {


  const [allUsers, setAllUsers] = useState([]);

  const [updateUserDetails, setUpdateUserDetails] = useState(null);

  const [openUpdateRole, setOpenUpdateRole] = useState(false);

  const getAllUsers = async () => {

    try {

      const response = await apiGanerator('allUsers', "GET", true);

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(responseData.error || responseData.message);
      }

      // console.log(responseData.data);

      setAllUsers(responseData.data);

    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }

  }

  useEffect(() => {

    getAllUsers();

  }, []);


  // new Date().toDateString
  // console.log(allUsers);

  return (
    <div className='py-4  bg-white '>

      <table className='w-full userTable'>

        <thead>
          <tr className='bg-black text-white'>
            <th>Sr. No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action </th>
          </tr>
        </thead>

        <tbody className=''>
          {allUsers.length > 0 &&
            allUsers.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>{moment(user.createdAt).format('LL')}</td>

                  <td>

                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' onClick={()=>{
                      setUpdateUserDetails(user);
                      setOpenUpdateRole(true);
                    }} >
                      <MdModeEdit />
                    </button>


                  </td>

                </tr>
              )
            })

          }
        </tbody>



      </table>

      {openUpdateRole && <ChangeUserRole
        onClose={() => setOpenUpdateRole(false)}
        name = {updateUserDetails?.username}
        id = {updateUserDetails?._id}
        email = {updateUserDetails?.email}
        role = {updateUserDetails?.role}
        callFunc = {()=>getAllUsers()}

      />}


    </div>
  )
}

export default AllUsersPage