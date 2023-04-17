import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

const Header = (props) => {
  // creates a reference to the 'dispatch' function from 'react-redux'. This function
  // is used to dispatch actions to the store, which will then update the state of the application. 
  // this function is later used for fetching the user's data and logging them in. 
  const dispatch = useDispatch();
  // creates a reference to the useNavigate hook from 'react-router-dom'. This is used to navigate the different
  // routes in the application.  
  const navigate = useNavigate();
  // selectUserName contains the current value of a user. This is exported from the userSlice file. 
  // useSelector is a hook from react-redux used to extract data from the Redux store state. 
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  // useEffect hook for executing callback below when the 'userName' dependency
  // changes. 
  useEffect(() => {
    // auth() is a method imported from the 'fireBase' library. 
    // the method 'onAuthStateChanged()' takes a callback which takes the 
    // user's properties and takes them to the home route. 
    auth.onAuthStateChanged(async (user) => {
    if (user) {
      // takes user's properties
      setUser(user);
      // takes user to the home page of the app. 
      navigate("/home");
    }
  });
  }, [userName]);

  // this function is executed when the login button is clicked. 
  const handleAuth = () => {
    // checks is userName is: null, false, undefined. 
    if (!userName) {
      // if user is not logged in, then the properties of the user selected
      // in the pop up are taken. 
      auth.signInWithPopup(provider).then((result) => {
        setUser(result.user);
      })
      // shows error if previous code didn't execute properly. 
      .catch((error) => {
        alert(error.message);
      });
      // code executed when Sign Out button is clicked. This button appears as a 
      // drop down when hovering over the user button. 
    } else if (userName) {
        auth.signOut().then(() => {
          // setSignOutState() is dispatched to the store to clear the current values of the 
          // user's properties. 
          dispatch(setSignOutState());
          // this takes the user to the login page. 
          navigate("/");
      })
      // if error occurs executing the code inside 'then()', this error is shown.  
      .catch((err) => alert(err.message));
    }
  };
  // the function creates the properties for the user and sets the values for those 
  // properties. 
  const setUser = (user) => {
    // this is an action creator being dispatched with specific properties. 
    // when then setUserLoginDetails reducer receives this action, it assigns values 
    // to the properties of the state using the values of the action payload. 
    // The object with the properties is sotred in the Redux store and can be accessed
    // from other components via the useSelector hook. 
    dispatch(setUserLoginDetails({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      })
    );
  };

  return (
  <Nav>
  <Logo>
  <img src="/images/logo.svg" alt="Disney+" />
  </Logo>
    {!userName ? (
      <Login onClick={handleAuth}>Login</Login>
    ) : (
      <>
        <NavMenu>
          <a href="/home">
            <img src="/images/home-icon.svg" alt="HOME" />
            <span>HOME</span>
          </a>
          <a>
            <img src="/images/search-icon.svg" alt="SEARCH" />
            <span>SEARCH</span>
          </a>
          <a>
            <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
            <span>WATCHLIST</span>
          </a>
          <a>
            <img src="/images/original-icon.svg" alt="ORIGINALS" />
            <span>ORIGINALS</span>
          </a>
          <a>
            <img src="/images/movie-icon.svg" alt="MOVIES" />
            <span>MOVIES</span>
          </a>
          <a>
            <img src="/images/series-icon.svg" alt="SERIES" />
            <span>SERIES</span>
          </a>
        </NavMenu>
        <SignOut>
          <UserImg src={userPhoto} alt={userName} />
          <DropDown>
            <span onClick={handleAuth}>Sign out</span>
          </DropDown>
        </SignOut>
      </>
    )}
  </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  /* @media (max-width: 768px) {
    display: none;
  } */
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  img:not([src]) {
    display: none;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
}`;

export default Header;