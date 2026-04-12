import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Eye, UserRoundPlus, UserRoundX } from 'lucide-react';
// import { Link } from 'react-router';
import { IoTrashOutline } from 'react-icons/io5';
import ViewUser from '../ViewUser';

const UserManagement = () => {
    const [modalType, setModalType] = useState(null)
    const [viewUser, setViewUser] = useState(null);
    const axiosUserManagement = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosUserManagement.get('/users')
            return res.data;
        }
    })

    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin':
                return 'badge-success';
            case 'rider':
                return 'badge-info';
            default:
                return 'badge-warning';
        }
    };

    const handleMakeAdmin = (user) => {
        const roleInfo = { role: 'admin' }
        Swal.fire({
            title: `Make ${user.name} Admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Make Admin"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosUserManagement.patch(`/users/${user._id}`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire("Success!", `${user.name} is now Admin`, "success");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire("Error!", "Something went wrong", "error");
                    });
            }
        });

        // =============================================================

        // axiosUserManagement.patch(`/users/${user._id}`, roleInfo)
        // Swal.fire({
        //     position: "top-center",
        //     icon: "success",
        //     title: `${user.name} User Marked as an Admin`,
        //     showConfirmButton: false,
        //     timer: 2000
        // });
    };



    const handleRemoveAdmin = (user) => {
        const roleInfo = { role: 'user' }
        Swal.fire({
            title: `Remove ${user.name} from Admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Remove"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosUserManagement.patch(`/users/${user._id}`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire("Removed!", `${user.name} is now User`, "success");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire("Error!", "Something went wrong", "error");
                    });
            }
        });

        // =============================================================

        // axiosUserManagement.patch(`/users/${user._id}`, roleInfo)
        // Swal.fire({
        //     position: "top-center",
        //     icon: "success",
        //     title: `${user.name} User Removed from Admin`,
        //     showConfirmButton: false,
        //     timer: 2000
        // });
    };


    const handleUserDelete = (id) => {
        console.log('user delete', id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosUserManagement.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            // refetch the data in the UI after deletion
                            refetch();
                            Swal.fire(
                                "Deleted!",
                                "Your parcel has been deleted.",
                                "success"
                            );
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                        Swal.fire(
                            "Error!",
                            "Failed to delete the parcel.",
                            "error"
                        );
                    })
            }
        });
    }


    const handleViewUserDetails = (user) => {
        setViewUser(user);
        setModalType("view")
    }

    return (
        <div>
            <h1 className='text-4xl'>Manage Users: {users.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>DAte & Time</th>
                            <th>Role</th>
                            <th>
                                <div className='flex gap-8'>
                                    <span>Admin / User</span>
                                    <span>Action</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            {/* <div className="text-sm opacity-50">United States</div> */}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td className="text-xs">
                                    {new Date(user.createdAt).toLocaleString("en-BD", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </td>
                                <td>
                                    <span
                                        className={`badge ${getRoleBadge(user.role)}`}
                                    // className={`badge 
                                    //             ${user.role === 'admin' && 'badge-success'}
                                    //             ${user.role === 'rider' && 'badge-info'}
                                    //             ${user.role === 'user' && 'badge-ghost'}
                                    //         `}
                                    >
                                        <span className={`badge ${getRoleBadge(user.role)} w-12`}>
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </span>
                                </td>
                                <th>
                                    <div className='flex gap-3'>
                                        <div className='ml-10 mr-6'>
                                            {user.role === 'admin'
                                                ? <div className="tooltip tooltip-bottom" data-tip="Remove Admin">
                                                    <button
                                                        onClick={() => handleRemoveAdmin(user)}
                                                        className="btn btn-square btn-outline text-[#fcb700] hover:text-gray-800 hover:bg-[#fcb700]"
                                                    >
                                                        <UserRoundX className='text-xs' />
                                                    </button>
                                                </div>
                                                : <div className="tooltip tooltip-bottom" data-tip="Make Admin">
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        className="btn btn-square btn-outline  text-[#00d390] hover:text-gray-800 hover:bg-[#00d390]"
                                                    >
                                                        <UserRoundPlus className='text-xs' />
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                        <div
                                            className="relative overflow-visible tooltip tooltip-bottom"
                                            data-tip="View Details"
                                        >
                                            <button
                                                onClick={() => handleViewUserDetails(user)}
                                                className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-black"
                                            >
                                                <Eye className="text-xs" />

                                            </button>
                                        </div>

                                        <div className="relative overflow-visible tooltip tooltip-bottom "
                                            data-tip="Remove">
                                            <button
                                                onClick={() => handleUserDelete(user._id)}
                                                className="btn btn-outline btn-square text-[#f87171] hover:bg-[#f87171] hover:text-black"
                                            >
                                                <IoTrashOutline className="text-lg" />
                                            </button>
                                        </div>

                                    </div>
                                </th>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
            {modalType === "view" && (
                <ViewUser
                    userView={viewUser}
                    onClose={() => {
                        setModalType(null);
                        setViewUser(null);
                    }}
                />
            )}
        </div>
    );
};

export default UserManagement;