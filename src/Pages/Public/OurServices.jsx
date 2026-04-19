import React from "react";
import serviceImg from "../../assets/service.png";

const OurServices = () => {
  return (
    
    <div className="md:py-20 max-w-7xl mx-auto md:px-20 bg-[#03373d] md:rounded-3xl rounded-lg md:my-10 px-5 py-5 text-gray-800">
      <h3 className="text-4xl mb-3 font-bold text-center text-white">
        Our Services
      </h3>

      <p className="text-center text-white text-sm mb-7">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to <br /> business shipments — we deliver
        on time, every time.
      </p>

      <div>
        <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-7 mt-7">
          <div
            className="bg-white border-1 border-gray-300 p-10 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:bg-[#caeb66] text-center flex flex-col items-center"
          >
            <div>
              <img src={serviceImg} alt="" />
            </div>
            <h3 className="text-xl font-bold my-4">Express  & Standard Delivery</h3>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>

          <div
            className="bg-white border-1 border-gray-300 p-10 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:bg-[#caeb66] text-center flex flex-col items-center"
          >
            <div>
              <img src={serviceImg} alt="" />
            </div>
            <h3 className="text-xl font-bold my-4">Nationwide Delivery</h3>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>

          <div
            className="bg-white border-1 border-gray-300 p-10 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:bg-[#caeb66] text-center flex flex-col items-center"
          >
            <div>
              <img src={serviceImg} alt="" />
            </div>
            <h3 className="text-xl font-bold my-4">Fulfillment Solution</h3>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-7 mt-7">
            
          <div
            className="bg-white border-1 border-gray-300 p-10 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:bg-[#caeb66] text-center flex flex-col items-center"
          >
            <div>
              <img src={serviceImg} alt="" />
            </div>
            <h3 className="text-xl font-bold my-4">Booking Pick & Drop</h3>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>

          <div
            className="bg-white border-1 border-gray-300 p-10 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:bg-[#caeb66] text-center flex flex-col items-center"
          >
            <div>
              <img src={serviceImg} alt="" />
            </div>
            <h3 className="text-xl font-bold my-4">Cash On Delivery</h3>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>

          <div
            className="bg-white border-1 border-gray-300 p-10 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:bg-[#caeb66] text-center flex flex-col items-center"
          >
            <div>
              <img src={serviceImg} alt="" />
            </div>
            <h3 className="text-xl font-bold my-4">Delivery Hub</h3>
            <p>
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OurServices;
