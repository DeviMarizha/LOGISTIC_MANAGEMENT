import React from 'react'
import './Faq.css'

function FaqPage() {
  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>

      <div className="faq-section">

        <div className="faq-question">
          <h3>How do I sign up for TPort?</h3>
          <div className="faq-answer">
            <ul>
              <li>To sign up for TPort, visit our website and click on the "Sign Up" button.</li>
              <li> Follow the instructions to create an account and start using our logistics management tools.</li>
            </ul>
          </div>
        </div>

        <div className="faq-question">
          <h3>Is TPort suitable for all types of businesses?</h3>
          <div className="faq-answer">
            <ul>
              <li>TPort is designed to accommodate businesses of all sizes, from small startups to large enterprises, providing flexible solutions to meet various logistics needs.</li>
            </ul>
          </div>
        </div>

        <div className="faq-question">
          <h3>How do I track my shipments with TPort?</h3>
          <div className="faq-answer">
            <ul>
              <li>You can track your shipments by logging into your TPort account and using our real-time tracking feature.</li>
            </ul>
          </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default FaqPage;