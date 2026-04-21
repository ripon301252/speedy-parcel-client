import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const AllTrackingId = () => {
    const axiosPublic = useAxiosPublic();
   

    // ✅ Fetch all tracking logs
    const { data: trackings = [], isLoading, refetch } = useQuery({
        queryKey: ["all-trackings"],
        queryFn: async () => {
            const res = await axiosPublic.get("/trackings");
            return res.data;
        }
    });

    // ✅ Delete function
    const handleDelete = async (id) => {
        console.log("Deleting ID:", id); // 👈 check
        try {
            await axiosPublic.delete(`/trackings/${id}`)
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
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-5">

            <h1 className="text-xl font-bold mb-4">Tracking Logs ({trackings.length})</h1>

            <div className="space-y-4">
                {trackings.map((item) => (
                    <div
                        key={item._id}
                        className="flex justify-between items-center border p-4 rounded-xl shadow"
                    >
                        <div>
                            <p className="font-semibold text-green-600 capitalize">
                                {item.status.replaceAll("-", " ")}
                            </p>
                            <p className="text-sm text-gray-500">
                                {new Date(item.createdAt).toLocaleString("en-BD")}
                            </p>
                        </div>

                        <button
                            onClick={() => handleDelete(item._id)}
                            className="btn btn-sm btn-error"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {trackings.length === 0 && (
                <p className="text-center mt-10 text-gray-500">
                    No tracking data found
                </p>
            )}
        </div>
    );
};

export default AllTrackingId;