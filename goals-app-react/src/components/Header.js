import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout, reset } from "../store/redux/userSlice";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onHandleLogout = () => {
    dispatch(signout());

    dispatch(reset());
    navigate("/signin");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"> GoalSetter</Link>
      </div>
      <ul>
        {!user ? (
          <>
            <li>
              <Link to="/signin">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <FaUser /> Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button type="button" className="btn" onClick={onHandleLogout}>
              <FaSignOutAlt /> SignOut
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
