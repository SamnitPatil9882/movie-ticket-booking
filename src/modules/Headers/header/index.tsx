import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardHeader } from 'reactstrap';
import storage from '../../../utils/storage';
import { clearStoredState } from '../../../app/store';
import { logout } from '../../../app/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUserData = useSelector((state: any) => state.auth.userData);
  const handleLogout = () => {
    storage.clearToken();
    dispatch(logout());
    clearStoredState();

    navigate('/');
  };

  return (
    <CardHeader className="w-full flex justify-between items-center bg-black border-b-2 border-gray-800 p-4 sticky top-0 z-10">
      <div className="w-20">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/012/793/378/small/sp-initial-letter-gold-calligraphic-feminine-floral-hand-drawn-heraldic-monogram-antique-vintage-style-luxury-logo-design-premium-vector.jpg" alt="logoImage" className="rounded-full transform scale-150" />
      </div>
      <div className="flex space-x-4">
        {authUserData && 
        <div className="text-white text-lg border-2 p-2 rounded-lg hover:text-red-500 cursor-pointer font-bold border-white">{authUserData.id}</div>
        }
        {authUserData.role_id === 2}{
          <div className="text-white text-lg border-2 p-2 rounded-lg hover:text-red-500 cursor-pointer font-bold border-white" onClick={()=>navigate("/my-tickets")}>My Tickets</div>
        }
        <div
          onClick={handleLogout}
          className="text-white text-lg border-2 p-2 rounded-lg hover:text-red-500 cursor-pointer font-bold border-white" // Added hover:border-white class
        >
          Logout
        </div>
      </div>
    </CardHeader>
  );
}

export default Header;
