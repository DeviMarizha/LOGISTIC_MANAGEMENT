import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container" >
      <div className='secondary_container'>
        <div className='block block_one'>
          <p className='block_text'>History</p>
        </div>
        <div className='block'>
          <p className="about">TPort was established in 2021 in response to the growing demand for efficient and reliable logistics solutions. At TPort, we are dedicated to transforming logistics management for businesses of all sizes, making it simpler and more effective to meet today’s demands.</p>
        </div>
      </div>
      <div className='secondary_container'>
        <div className='block'>
          <p className="about">Our mission is to enhance visibility, efficiency, and coordination in the logistics industry, ensuring that goods are delivered on time and with precision.</p>
        </div>
        <div className='block block_two'>
          <p className='block_text'>Mission</p>
        </div>
      </div>
      <div className='secondary_container'>
        <div className='block block_three'>
          <p className='block_text'>Services</p>
        </div>
        <div className='block'>
          <p className="about">For those looking for a cost-effective option, our Budget Delivery service offers a reliable and affordable way to send parcels, without compromising on quality.</p>
        </div>
      </div>
      <div className='secondary_container'>
        <div className='block'>
          <p className="about">We services can be transacted online or physically. We have tracking to keep up to date with the delivery process</p>
        </div>
        <div className='block block_four'>
          <p className='block_text'>Technology</p>
        </div>
      </div>
    </div>
  );
}

export default About;
