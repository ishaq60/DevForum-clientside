import React from 'react';
import UseAlluser from '../../../Hooks/UseAlluser';
import Swal from 'sweetalert2';
import UseaxiosPublic from '../../../Hooks/UseaxiosPublic';

const Manageuser = () => {
  const axiosPublic = UseaxiosPublic();
  const [allUsers] = UseAlluser();

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
    <div className="w-full p-4 space-y-4">
      {/* ✅ TABLE for medium+ screens */}
      <div className="hidden md:block overflow-x-auto rounded border border-base-content/10 bg-base-100">
        <table className="min-w-full divide-y divide-base-content/20">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Subscription</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-base-100 divide-y divide-base-content/10">
            {allUsers.map((user, index) => (
              <tr key={user._id} className="hover:bg-base-200 transition">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user?.name}</td>
                <td className="px-4 py-2">{user?.email}</td>
                <td className="px-4 py-2">{user?.SubscriptionStatus}</td>
                <td className="px-4 py-2">
                  {user?.role === "admin" ? (
                    <span className="px-3 py-1 text-xs rounded bg-red-500 text-white">
                      {user?.role}
                    </span>
                  ) : (
                    <button
                      onClick={() => makeAdmin(user?._id)}
                      className="btn btn-primary btn-sm"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ CARD LIST for small screens */}
      <div className="md:hidden space-y-4">
        {allUsers.map((user, index) => (
          <div
            key={user._id}
            className="border border-base-content/10 rounded-lg p-4 bg-base-100 shadow-sm"
          >
            <div className="text-lg font-bold">{index + 1}. {user?.name}</div>
            <div className="text-sm text-base-content/70 mb-1">{user?.email}</div>
            <div className="text-sm mb-2">Subscription: {user?.SubscriptionStatus}</div>
            <div>
              {user?.role === "admin" ? (
                <span className="inline-block px-3 py-1 text-xs rounded bg-red-500 text-white">
                  {user?.role}
                </span>
              ) : (
                <button
                  onClick={() => makeAdmin(user?._id)}
                  className="btn btn-primary btn-sm"
                >
                  Make Admin
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manageuser;
