import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { ShieldOff, ShieldPlus } from 'lucide-react';

const UserManagement = () => {
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
        axiosUserManagement.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${user.name} User Marked as an Admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleRemoveAdmin = (user) => {
        const roleInfo = { role: 'user' }
        axiosUserManagement.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${user.name} User Removed from Admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
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
                            <th>Role</th>
                            <th>Admin / User</th>
                            <th>Others Action</th>
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
                                    {user.role === 'admin'
                                        ? <div className="tooltip tooltip-bottom" data-tip="Remove Admin">
                                            <button
                                                onClick={() => handleRemoveAdmin(user)}
                                                className="btn btn-square btn-outline text-[#fcb700] hover:text-gray-800 hover:bg-[#fcb700]"
                                            >
                                                <ShieldOff className='text-xs' />
                                            </button>
                                        </div>
                                        : <div className="tooltip tooltip-bottom" data-tip="Make Admin">
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-square btn-outline  text-[#00d390] hover:text-gray-800 hover:bg-[#00d390]"
                                            >
                                                <ShieldPlus className='text-xs' />
                                            </button>
                                        </div>
                                    }
                                </th>
                                <th>
                                    <button className='btn btn-sm mr-3'>View</button>
                                    <button className='btn btn-sm'>Delate</button>
                                </th>
                            </tr>)

                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default UserManagement;