import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { selectUserName } from "../features/user/userSlice";
import { auth } from "../firebase";

// this component takes all the children components that it protects plus the rest of the arguments
// that are passed to it. 
const ProtectedRoute = ({ children, ...rest }) => {
  // selectUserName is a selector function coming from the 'userSlice.js' file. 
  // It holds the state of the user's name. Its value is accessed using the 
  // useSelector hook. 
  const userName = useSelector(selectUserName);
  // using the 'useNavigate' hook, the 'navigate' function is created to access different routes.  
  const navigate = useNavigate();

  // Since there is an empty array as the second argument, the callback inside the useEffect will
  // only run on the first render. 
  useEffect(() => {
    // onAuthStateChanged is a method from the 'auth' service provided by Firebase
    // to handle authentication in an application without having manually build a backend 
    // to deal with users login process. 
    // The callback inside 'onAuthStateChanged' is executed every time there is 
    // a change in the user's authentication state. 
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // User is not authenticated, redirect to login page
        navigate("/", { replace: true });
      }
    });

    // Unsubscribe from onAuthStateChanged to prevent memory leaks.
    // This helps prevent the app from throwing errors. This will unsubscribe the app
    // from the 'onAuthStateChanged' listener and it will no longer continue to listen for
    // change in the authentication state. 
    return () => unsubscribe();
  }, []);

  // If user is not authenticated, redirect to login page
  if (!userName) {
    // the 'replace' attribute replaces the current URL in the browser history stack with 
    // the new URL specified in the to attribute, without adding a new entry to the history stack.
    return <Navigate to="/" replace />;
  }

  // If user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;


