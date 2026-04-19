import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ismpp5l",  
        "template_d6w3243", 
        formRef.current,
        "5VmMzxI_WOZfotIti"
      )
      .then(
        () => {
          toast.success("Message sent successfully ✅");
          e.target.reset();
        },
        (error) => {
          toast.error("Failed to send ❌");
          console.log(error);
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-6">
        Contact Us
      </h1>

      <div className="shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            className="w-full border p-3 rounded-lg"
            required
          ></textarea>

          <button className="bg-green-500 text-white py-3 rounded-lg">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;