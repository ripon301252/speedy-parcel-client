import React, { useRef, useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Eye } from 'lucide-react';
import Swal from 'sweetalert2';

const CashOutHistory = () => {
  const [selectedCashOut, setSelectedCashOut] = useState(null);
  const { user } = useAuth();
  const axiosCashOut = useAxiosSecure();
  const cashOutModalRef = useRef();

  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data } = useQuery({
    queryKey: ['cashOuts', user?.email, status, page],
    queryFn: async () => {
      const url = `/cash-out?email=${user?.email}&status=${status}&page=${page}&limit=${limit}`;
      const res = await axiosCashOut.get(url);
      return res.data;
    }
  });

  const cashOuts = data?.data || [];
  const total = data?.total ?? 0;

  const handleCashOutRiderModal = (cashOut) => {
    setSelectedCashOut(cashOut);
    cashOutModalRef.current.showModal();
  };

  return (
    <div className="lg:max-w-7xl lg:mx-auto lg:py-10 py-5 mx-3">

      {/* HEADER */}
      <h1 className="lg:text-5xl text-3xl font-bold mb-2">
        Cash Out History
      </h1>

      <h2 className="text-base mb-4 opacity-20">
        Total Records: ({total})
      </h2>

      {/* FILTER */}
      <div className="mb-4 w-full md:w-1/3">
        <select
          className="select select-bordered w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block overflow-x-auto max-w-7xl mx-auto shadow rounded-xl">
        <table className="table w-full">

          <thead className="">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {cashOuts.map((cashOut, i) => (
              <tr key={cashOut._id} className="hover">

                <td>{i + 1}</td>

                <td>
                  <div className="flex items-center gap-2">
                    <img
                      src={cashOut.riderPhoto}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold">{cashOut.riderName}</p>
                      <p className="text-xs">{cashOut.riderEmail}</p>
                    </div>
                  </div>
                </td>

                <td className="text-sm">
                  {cashOut.riderDistrict}, {cashOut.riderArea}
                </td>

                <td className="font-semibold">{cashOut.amount} Tk</td>

                <td>
                  <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-600">
                    {cashOut.status}
                  </span>
                </td>

                <td className="text-xs">
                  {new Date(cashOut.createdAt).toLocaleString()}
                </td>

                <td>
                  <button
                    onClick={() => handleCashOutRiderModal(cashOut)}
                    className="btn btn-square btn-outline text-blue-500 hover:bg-blue-500 hover:text-gray-800"
                  >
                    <Eye className='text-lg' />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

        {/* PAGINATION */}
        <div className="flex justify-center gap-3 p-4">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span className="px-3 py-1 border rounded">
            Page {page}
          </span>

          <button
            className="btn btn-sm"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid gap-4 md:hidden">

        {cashOuts.map((cashOut, i) => (
          <div key={cashOut._id} className="border rounded-xl p-4 shadow ">

            <div className="flex justify-between">
              <h2 className="font-bold">#{i + 1}</h2>
              <span
                className={`text-xs font-medium ${cashOut.status === "pending"
                    ? "text-yellow-500"
                    : cashOut.status === "approved"
                      ? "text-green-500"
                      : cashOut.status === "rejected"
                        ? "text-red-500"
                        : "text-gray-500"
                  }`}
              >
                {cashOut.status}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <img
                src={cashOut.riderPhoto}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{cashOut.riderName}</p>
                <p className="text-xs text-gray-500">{cashOut.riderEmail}</p>
              </div>
            </div>

            <p className="text-sm mt-2">
              📍 {cashOut.riderDistrict}, {cashOut.riderArea}
            </p>

            <p className="font-bold mt-1">
              {cashOut.amount} Tk
            </p>

            <div className="mt-3">
              <button
                onClick={() => handleCashOutRiderModal(cashOut)}
                className="btn btn-xs btn-primary"
              >
                View
              </button>
            </div>

          </div>
        ))}

      </div>

      {/* ================= MODAL ================= */}
      <dialog ref={cashOutModalRef} className="modal">
        <div className="modal-box w-11/12 max-w-lg">

          <h3 className="font-bold text-lg mb-4">Cash Out Details</h3>

          {selectedCashOut && (
            <div className="space-y-3 text-sm">

              <p><b>Name:</b> {selectedCashOut.riderName}</p>
              <p><b>Email:</b> {selectedCashOut.riderEmail}</p>
              <p><b>Amount:</b> {selectedCashOut.amount} Tk</p>
              <p><b>Status:</b> {selectedCashOut.status}</p>
              <p><b>Location:</b> {selectedCashOut.riderDistrict}, {selectedCashOut.riderArea}</p>

            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>

        </div>
      </dialog>

    </div>
  );
};

export default CashOutHistory;