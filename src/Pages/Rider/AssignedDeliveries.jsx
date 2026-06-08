import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { MdCheckCircle, MdCancel, MdLocalShipping } from "react-icons/md";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosAssignedDelivery = useAxiosSecure();

  // const { data: parcels = [], refetch } = useQuery({
  //   queryKey: ['parcels', user?.email, 'driver_assigned'],
  //   queryFn: async () => {
  //     const res = await axiosAssignedDelivery.get(
  //       `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
  //     );
  //     return res.data;
  //   }
  // });

  const { data = {}, refetch } = useQuery({
    queryKey: ['parcels', user?.email, 'driver_assigned'],
    queryFn: async () => {
      const res = await axiosAssignedDelivery.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    }
  });

  const parcels = Array.isArray(data?.data) ? data.data : [];

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const deliveryStatusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId
    };

    axiosAssignedDelivery.patch(
      `/parcels/${parcel._id}/deliveryStatus`,
      deliveryStatusInfo
    ).then(res => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `Updated to ${status.replace("_", " ")}`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <div className="lg:max-w-6xl lg:mx-auto lg:py-10 py-5 mx-3">

      <h1 className="lg:text-5xl text-3xl font-bold mb-4">
        {/* Assigned Deliveries ({parcels.length}) */}
        Assigned Deliveries
      </h1>

      <p className="text-base opacity-20 mb-4">
        Total Records : ({parcels.length})
      </p>

    
      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block overflow-x-auto max-w-7xl mx-auto rounded-xl shadow">
        <table className="table w-full">
          <thead className="">
            <tr>
              <th>#</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Parcel</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Others Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={parcel.senderPhoto} alt="" />
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">{parcel.senderName}</div>
                      <div className="font-bold">{parcel.senderArea}</div>
                      <div className="text-sm opacity-50">{parcel.senderEmail}</div>
                    </div>
                  </div>
                </td>

                <td>{parcel.receiverName}</td>
                <td>{parcel.parcelName}</td>

                <td className="text-xs">{parcel.deliveryStatus}</td>

                <th>
                  <div className='flex gap-3'>
                    {parcel.deliveryStatus === "driver_assigned" ? (
                      <>
                        <div className="relative overflow-visible tooltip tooltip-bottom"
                          data-tip="Rider Accepted">
                          <button
                            onClick={() =>
                              handleDeliveryStatusUpdate(parcel, "rider_accepted")
                            }
                            className="text-green-600 hover:bg-green-600 hover:text-gray-800 cursor-pointer btn btn-square btn-outline"
                          >
                            <MdCheckCircle size={20} />
                          </button>
                        </div>

                        <div className="relative overflow-visible tooltip tooltip-bottom"
                          data-tip="Rider Rejected">
                          <button
                            onClick={() =>
                              handleDeliveryStatusUpdate(parcel, "rider_rejected")
                            }
                            className="text-red-600 hover:bg-red-600 hover:text-gray-800 cursor-pointer btn btn-square btn-outline"
                          >
                            <MdCancel size={20} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <span className="text-green-500">Accepted</span>
                    )}
                  </div>
                </th>

                <th>
                  <div>
                    {parcel.deliveryStatus === "parcel_picked_up" ? (
                      <div className="relative overflow-visible tooltip tooltip-bottom"
                        data-tip="Rider Delivered">
                        <button
                          onClick={() =>
                            handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                          }
                          className="text-green-600 hover:bg-green-600 hover:text-gray-800 cursor-pointer btn btn-square btn-outline"
                        >
                          <MdCheckCircle size={20} />
                        </button>
                      </div>
                    ) : parcel.deliveryStatus === "rider_accepted" ? (
                      <div className="relative overflow-visible tooltip tooltip-bottom"
                        data-tip="Rider picked Up">
                        <button
                          onClick={() =>
                            handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                          }
                          className="text-orange-600 hover:bg-orange-600 hover:text-gray-800 cursor-pointer btn btn-square btn-outline"
                        >
                          <MdLocalShipping size={20} />
                        </button>
                      </div>
                    ) : <span className="text-xs text-green-500">Coming action</span>}
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CARDS (MOBILE) ================= */}
      <div className="grid grid-cols-1 gap-4 md:hidden">

        {parcels.map((parcel, i) => (
          <div key={parcel._id} className=" shadow rounded-xl p-4 border">

            <div className="flex justify-between">
              <h2 className="font-bold">#{i + 1} {parcel.parcelName}</h2>
              <span className="text-xs text-gray-500">
                {parcel.deliveryStatus}
              </span>
            </div>

            <div className="text-sm mt-2 space-y-1">
              <p><b>Sender:</b> {parcel.senderName}</p>
              <p><b>Receiver:</b> {parcel.receiverName}</p>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between mt-4">
              <div className='flex gap-3'>
                {parcel.deliveryStatus === "driver_assigned" ? (
                  <>
                    <div className="relative overflow-visible tooltip tooltip-bottom">
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_accepted")
                        }
                        className=" cursor-pointer btn btn-xs btn-accent"
                      >
                        Accepted
                      </button>
                    </div>

                    <div className="relative overflow-visible tooltip tooltip-bottom">
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_rejected")
                        }
                        className="cursor-pointer btn btn-xs btn-error"
                      >
                        {/* <MdCancel size={20} /> */}
                        Rejected
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="text-green-500">Accepted</span>
                )}
              </div>

              <div>
                {parcel.deliveryStatus === "parcel_picked_up" ? (
                  <div className="relative overflow-visible tooltip tooltip-bottom">
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                      }
                      className="cursor-pointer btn btn-xs btn-accent"
                    >
                      Delivered
                    </button>
                  </div>
                ) : parcel.deliveryStatus === "rider_accepted" ? (
                  <div className="relative overflow-visible tooltip tooltip-bottom">
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                      }
                      className="text-orange-600 hover:bg-orange-600 hover:text-gray-800 cursor-pointer btn btn-xs btn-primary"
                    >
                      Picked Up
                    </button>
                  </div>
                ) : <span className="text-xs text-green-500">Coming action</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedDeliveries;