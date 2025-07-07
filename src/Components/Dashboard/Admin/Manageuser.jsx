import React from 'react';
import UseAlluser from '../../../Hooks/UseAlluser';
import Swal from 'sweetalert2';
import axios from 'axios';
import UseaxiosPublic from '../../../Hooks/UseaxiosPublic';

const Manageuser = () => {
    const axiosPublic=UseaxiosPublic()

const [allUsers]=UseAlluser()
console.log(allUsers)

const makeAdmin = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You are about to make this user an admin.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, make admin!"
  }).then((result) => {
    if (result.isConfirmed) {
      axiosPublic.patch(`/makeadmin/${id}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "User has been made an admin.",
              icon: "success"
            });
          } else {
            Swal.fire({
              title: "Already Admin!",
              text: "This user is already an admin.",
              icon: "info"
            });
          }
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error"
          });
        });
    }
  });
};


    
    return (
        <div>
           <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead className='text-xl font-bold'>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th> Subscription Status</th>
        <th>Action</th>
      </tr>
    </thead>
   {
    allUsers.map((user)=>(
         <tbody>
      {/* row 1 */}
      <tr  className='p-2'>
        <th></th>
        <td>{user?.name}</td>
        <td>{user?.email}</td>
        <td>{user?.SubscriptionStatus}</td>
       {
        user?.role==="admin"?(
            <button className='p-2 bg-red-500 rounded-sm' >{user?.role}</button>
        ):(
         <button onClick={()=>makeAdmin(user?._id)} className='p-2 btn btn-primary'>Make Admin</button>)
       }
      </tr>
      {/* row 2 */}
 
    </tbody>
    ))
   }
  </table>
</div>
        </div>
    );
};

export default Manageuser;