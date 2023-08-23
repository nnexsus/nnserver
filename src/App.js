import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { lazy } from "react";

import Signin from "./components/account/signin";
import Signup from "./components/account/signup";
import Signout from './components/account/signout';

import { Global } from './globalStyles';
import SendVerify from "./components/account/sendverify";
import Forgot from "./components/account/forgot";
import Verify from './components/account/verify';
import Reset from './components/account/reset';
import Tos from "./components/mainpages/tos";

import { LinkProvider } from './components/states/context';
import UserContextMenu from "./components/states/userContextMenu";
import StarredFiles from "./components/subpages/starredfiles";
import ContextMenu from "./components/states/contextMenu";
import Dashboard from "./components/admin/dashboard";
import Folder from "./components/mainpages/folder";
import Toaster from "./components/states/toaster";
import Preview from "./components/states/preview";
import Canna from "./components/mainpages/canna";

const Home = lazy(() => import('./components/mainpages/home'));

const Account = lazy(() => import('./components/account/account'));
const SingleFile = lazy(() => import('./components/subpages/singlefile'));
const About = lazy(() => import('./components/mainpages/about'));

const Header = lazy(() => import('./components/header'));
const Footer = lazy(() => import('./components/footer'));

function App() {

  return (
    <>
      <Global/>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css"></link> 
      <Header/>
        <LinkProvider>
  <Router>
    <div className="App">
        <Routes>
          <Route path="/folder/:id" element={<Folder/>}/>
          <Route path="/file/:id" element={<SingleFile/>}/>
          <Route path="/reset/:id" element={<Reset/>}/>
          <Route path="/verify/:id" element={<Verify/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signout" element={<Signout/>}/>
          <Route path="/forgot" element={<Forgot/>}/>
          <Route path="/sendverify" element={<SendVerify/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/favorites" element={<StarredFiles/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/tos" element={<Tos/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/admin" element={<Dashboard/>}/>
          <Route path="/canna" element={<Canna/>}/>
          <Route path="*" element={<div style={{width: '100%'}}><h1 style={{color: 'white', textAlign: 'center', fontFamily: 'Comp'}}>Page not found.</h1></div>}/>
        </Routes>
    </div>
  </Router>
          <Toaster/>
          <ContextMenu/>
          <UserContextMenu/>
          <Preview/>
        </LinkProvider>
      <Footer/>
    </>
  );
}

export default App;
