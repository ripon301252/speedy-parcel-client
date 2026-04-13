import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignRiders = () => {
    const [selectedParcel, setSelectedParcel] = useState(null);
    const axiosAssignRider = useAxiosSecure();
    const riderModalRef = useRef();

    const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
        queryKey: ["parcels", "pending-pickup"],
        queryFn: async () => {
            const res = await axiosAssignRider.get('/parcels?deliveryStatus=pending-pickup')
            return res.data;
        }
    })

    const { data: riders = [], isLoading: ridersLoading } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, selectedParcel?.senderArea, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosAssignRider.get(
                `/riders?status=approved&riderDistrict=${selectedParcel.senderDistrict}&riderArea=${selectedParcel.senderArea}&workStatus=available`
            )
            return res.data;
        }
    })

    const handleAssignRiderModal = (parcel) => {
        setSelectedParcel(parcel);
        console.log(parcel.senderDistrict, parcel.senderArea)
        riderModalRef.current.showModal();
    }

    const handleAssignRider = async (rider) => {
        const riderAssignInfo = {
            riderId: rider._id,
            riderName: rider.riderName,
            riderEmail: rider.riderEmail,
            parcelId: selectedParcel._id,
            // riderDistrict: rider.riderDistrict,
            // riderArea: rider.riderArea,
            // parcelName: selectedParcel.parcelName,
            // senderEmail: selectedParcel.senderEmail,
        }
        await axiosAssignRider.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo) 
            .then(res => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close()
                    parcelsRefetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `Rider has been assigned`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }



    return (
        <div>
            <h1 className='text-4xl'>Assign Rider: {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Cost</th>
                            <th>Date & Time</th>
                            <th>Pickup District</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => <tr key={parcel._id}>
                            <th>{i + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>{parcel.cost} Tk</td>
                            <td className="text-xs">
                                {new Date(parcel.createdAt).toLocaleString("en-BD", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </td>
                            <td>
                                <div>
                                    {parcel.senderRegion}
                                </div>
                                <div className='flex gap-1'>
                                    <div className="font-bold opacity-70">{parcel.senderDistrict} ,</div>
                                    <div className="text-sm opacity-50">{parcel.senderArea}</div>
                                </div>
                            </td>

                            <td>
                                <button
                                    onClick={() => handleAssignRiderModal(parcel)}
                                    className='btn btn-sm'>Find Rider</button>
                            </td>
                        </tr>)
                        }

                    </tbody>
                </table>
            </div>


            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box w-full max-w-4xl">

                    <h3 className="font-bold text-lg mb-4">
                        Riders: {ridersLoading ? "Loading..." : riders.length}
                    </h3>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {riders.map((rider, i) => (
                                    <tr key={rider._id}>
                                        <th>{i + 1}</th>

                                        <td>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src={rider.riderPhoto}
                                                    alt=""
                                                />
                                                <div>
                                                    <p className="font-bold">{rider.riderName}</p>
                                                    <p className="text-xs opacity-50">{rider.riderEmail}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            {rider.riderDistrict}, {rider.riderArea}
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => handleAssignRider(rider)}
                                                className="btn btn-xs btn-primary">
                                                Assign
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3 max-h-[400px] overflow-y-auto">
                        {riders.map((rider) => (
                            <div key={rider._id} className="border p-3 rounded-lg shadow-sm">

                                <div className="flex items-center gap-3">
                                    <img
                                        className="w-12 h-12 rounded-full"
                                        src={rider.photo}
                                        alt=""
                                    />

                                    <div>
                                        <p className="font-bold">{rider.riderName}</p>
                                        <p className="text-xs text-gray-500">{rider.riderEmail}</p>
                                    </div>
                                </div>

                                <div className="mt-2 text-sm">
                                    📍 {rider.riderDistrict}, {rider.riderArea}
                                </div>

                                <button
                                    onClick={() => handleAssignRider(rider)}
                                    className="btn btn-sm btn-primary w-full mt-3"
                                >
                                    Assign
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {!ridersLoading && riders.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">
                            No riders available
                        </p>
                    )}

                    {/* Close Button */}
                    <div className="modal-action">
                        <form method="dialog" className="w-full">
                            <button className="btn w-full sm:w-auto">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;