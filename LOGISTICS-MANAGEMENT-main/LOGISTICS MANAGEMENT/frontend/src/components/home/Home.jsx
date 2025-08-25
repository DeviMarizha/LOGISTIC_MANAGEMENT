import React from 'react';
import './Home.css';
import image from './homepage-image.png'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

function Home() {

  return (
  <div>
      <div className="home_container">
        <div id="home" className="">
          <h1 id="welcome">Welcome to TPort</h1>
          <p id="welcome_subtext">TPORT is a logistics management website that helps businesses manage and track their shipments and inventory. 
          Sign up to gain access to a quick and efficient delivery for your  personal use or business products</p>
            <>
             <Link to="/login"><button id="btn">Get Started</button></Link>
            </>
        </div>
        <div className="">
          <img id="img" src={image} alt="Deliveroo" />
        </div>
      </div>

      <div className='secondary_container'>
          <div className='block block_one'>
            <p className='block_text'>Fast</p>
          </div>
          <div className='block block_two'>

            <p className='block_text'>Reliable</p>
          </div>
          <div className='block block_three'>
            <p className='block_text'>Honest</p>
          </div>
          <div className='block block_four'>
          <p className='block_text'>Afforable</p>
          </div>
      </div>

  </div>
  );
}

export default Home;
