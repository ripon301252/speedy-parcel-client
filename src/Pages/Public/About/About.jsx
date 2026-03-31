import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        About Speedy Parcel
      </h1>
      <p className="text-gray-700 max-w-2xl text-center mb-6">
        Speedy Parcel is a reliable delivery service committed to providing
        fast, safe, and affordable shipping solutions across Bangladesh. 
        Whether you're sending documents, parcels, or heavy goods, 
        we ensure timely deliveries with real-time tracking.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full mt-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-green-500 mb-2">Fast Delivery</h2>
          <p className="text-gray-600">
            We guarantee quick delivery across major cities and remote areas.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-green-500 mb-2">Secure Packages</h2>
          <p className="text-gray-600">
            Your parcels are safe with us. We handle each delivery with utmost care.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-green-500 mb-2">Real-time Tracking</h2>
          <p className="text-gray-600">
            Track your parcel at every step and stay updated until it reaches the destination.
          </p>
        </div>
      </div>

      <div className="mt-10 max-w-2xl text-center text-gray-700">
        <p>
          At Speedy Parcel, our mission is to make parcel delivery seamless and stress-free. 
          Join thousands of satisfied customers who trust us for their delivery needs.
        </p>
      </div>
    </div>
  );
};

export default About;