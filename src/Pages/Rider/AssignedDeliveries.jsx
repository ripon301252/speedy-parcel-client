import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { MdCheckCircle, MdCancel, MdLocalShipping } from "react-icons/md";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosAssignedDelivery = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels', user?.email, 'driver_assigned'],
    queryFn: async () => {
      const res = await axiosAssignedDelivery.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    }
  });

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
    <div className="p-4 md:p-6">

      <h1 className="text-lg md:text-2xl font-bold mb-4 ml-6">
        Assigned Deliveries ({parcels.length})
      </h1>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block overflow-x-auto max-w-7xl mx-auto bg-white rounded-xl shadow text-gray-800">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th>#</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Parcel</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <td>{i + 1}</td>
                <td className="text-sm">{parcel.senderName}</td>
                <td className="text-sm">{parcel.receiverName}</td>
                <td>{parcel.parcelName}</td>

                <td className="text-xs">
                  {parcel.deliveryStatus}
                </td>

                <td className="flex gap-2">
                  <button onClick={() => handleDeliveryStatusUpdate(parcel, "rider_accepted")} className="text-green-600">
                    <MdCheckCircle size={20} />
                  </button>

                  <button onClick={() => handleDeliveryStatusUpdate(parcel, "rider_rejected")} className="text-red-600">
                    <MdCancel size={20} />
                  </button>

                  <button onClick={() => handleDeliveryStatusUpdate(parcel, "parcel_picked_up")} className="text-orange-600">
                    <MdLocalShipping size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CARDS (MOBILE) ================= */}
      <div className="grid grid-cols-1 gap-4 md:hidden">

        {parcels.map((parcel, i) => (
          <div key={parcel._id} className="bg-white shadow rounded-xl p-4 border text-gray-800">

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

              <button onClick={() => handleDeliveryStatusUpdate(parcel, "rider_accepted")} className="text-green-600">
                Accept
              </button>

              <button onClick={() => handleDeliveryStatusUpdate(parcel, "rider_rejected")} className="text-red-600">
                Reject
              </button>

              <button onClick={() => handleDeliveryStatusUpdate(parcel, "parcel_picked_up")} className="text-orange-600">
                Picked
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AssignedDeliveries;