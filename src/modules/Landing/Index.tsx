import React from 'react';
import { Button, CardHeader } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function Landing() {

  const navigate = useNavigate();
  // Compelling quotes to attract customers
  const quotes = [
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The future belongs to those who believe in the beauty of their dreams."
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* <LoginHeader /> */}
      <CardHeader className="w-full flex justify-between items-center bg-black border-b-2 border-gray-800 p-4">
        <div className="w-20">
          <img src="logo.png" alt="logoImage" className="logo-img rounded-full" />
        </div>
        {/* <div className="flex space-x-4">
          <div className="text-white text-lg hover:text-red-500 cursor-pointer" onClick={handleLogin}>Login</div>
          <div className="text-white text-lg hover:text-red-500 cursor-pointer" onClick={handleRegister}>Register</div>
        </div> */}
      </CardHeader>
      <div className="flex flex-col items-center justify-center text-center py-16">
        <h1 className="text-6xl font-bold mb-8">Welcome to Our Movie Platform</h1>
        <p className="text-xl mb-12">Unlimited entertainment awaits you!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {quotes.map((quote, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-6">
              <p className="text-xl font-semibold mb-4 text-white">"{quote}"</p>
            </div>
          ))}
        </div>
      </div>
      <Button 
      onClick={() => navigate("/home")}
      className='btn btn-primary font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg py-4 px-8 mt-8'>Let's Book Ticket <br/> Of World of Imagination</Button>
    </div>
  );
}

export default Landing;
