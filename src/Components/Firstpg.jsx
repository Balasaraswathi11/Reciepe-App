import React from 'react';
import food from "../assets/ramen.png";
import meat from "../assets/meat.png";
import { GiKnifeFork } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const Firstpg = () => {
  const navigate = useNavigate();
  
  const handleclick = () => {
    navigate("/reci"); // This is correct for navigating to /reci
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen overflow-hidden bg-gray-800'>
      <div className='flex flex-col md:flex-row justify-center items-center w-full'>
        <img src={meat} alt="Meat Dish" className='w-full z-10 md:w-1/2 slide-left' />
        <div className='w-1/2 flex flex-col items-center justify-center md:w-1/3'>
          <h1 className='text-white text-center text-xl md:text-4xl mb-4 font-serif'>Cook like a chef</h1>
          <GiKnifeFork size={40} /> {/* Adjusted icon size directly */}
          <button className='md:w-1/3 w-full mt-5 text-white text-center text-xl bg-orange-500 p-2 hover:border-red-600 py-2 rounded animate-pulse' onClick={handleclick}>
            Let’s get started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Firstpg;
