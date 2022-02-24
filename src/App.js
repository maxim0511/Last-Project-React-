import React from 'react';
import './App.css';
import { Routes,Route } from 'react-router';
import PopularContainer from './Components/Popular/PopularContainer';
import NewContainer from './Components/New/NewContainer';
import Login from './Components/Account/Auth/Login';
import Registration from './Components/Account/Registration/Registration';
import HeaderContainer from './Components/Header/HeaderContainer';
import AddImgContainer from './Components/AddImg/addImgContainer';


const App = (props) =>{
  return (
      <div className='App'>
         <HeaderContainer/>
            <div className="content">
              <Routes>
                 <Route path = "/" exact element={<Login/>}/>
                 <Route path = "/Registration" exact element={<Registration/>}/>
                 <Route path="/New"  element={<NewContainer/>}/>  
                 <Route path="/AddImg"  element={<AddImgContainer/>}/> 
                  <Route path='/Popular' element={<PopularContainer/>}/>
              </Routes>
            </div>
      </div>
  );
}

export default App;
