import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Contact Us</h1>
      <p className="text-gray-700 text-center max-w-2xl mb-10">
        Have questions or need help with your delivery? Fill out the form below 
        or reach out to our support team, and we’ll get back to you as soon as possible.
      </p>

      <div className=" shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <form className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea 
              rows="5" 
              placeholder="Your Message" 
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-gray-700">
          <p className="mb-2"><strong>Phone:</strong> +880 1234 567890</p>
          <p className="mb-2"><strong>Email:</strong> support@speedyparcel.com</p>
          <p><strong>Address:</strong> 123 Speedy St, Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;