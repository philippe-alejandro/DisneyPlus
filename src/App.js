import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
// the lazy function allows for components to be rendered or mounted
// only when they are needed, instead of having to render them every time 
// the app is loaded. This can improve performance by reducing the amount of 
// components that are required at any given time. 
const Home = lazy(() => import("./components/Home"));
const Detail = lazy(() => import("./components/Detail"));

function App() {
  return (
    <div className="App">
        <Header />
        {/*The Suspense component allows to show some fallback content
           while a lazy-loaded component is being mounted. 
        */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/*
            These are all the possible routes that a user can visit when using
            the app. These are: the login page, the home page, and the detail page
            for each of the movies shown in the home page. 
            */}
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/detail/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
          </Routes>
        </Suspense>
    </div>
  );
}

// <Route path="/home" element={<Home />} />
// <Route path="/detail/:id" element={<Detail />} />

export default App;
