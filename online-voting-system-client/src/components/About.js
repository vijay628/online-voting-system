import React from 'react'

export default function About() {
  return (
    <div className='container mt-3'>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              About Us
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Welcome to our online voting system project!</strong><br/>
              We are passionate about promoting democratic principles and facilitating citizen participation in the electoral process.
              <br/>
              <strong>Our team consists of dedicated developers,</strong><br/>
              committed to building robust and reliable software solutions. We strive to uphold the highest standards of integrity, transparency, and fairness in everything we do.
              <br/>
              <strong>With our online voting system, voters can easily access information</strong><br/>
              about voting rules, candidates, and election events. They can cast their votes with confidence, knowing that their voices will be heard and counted accurately.
              <br/>
              <strong>We believe that technology can play a vital role</strong><br/>
              in strengthening democracy and fostering civic engagement. By leveraging innovative solutions, we aim to empower citizens to exercise their fundamental right to vote and contribute to shaping the future of our society.
              <br/>
              <strong>Thank you for choosing our online voting system.</strong><br/>
              We are committed to continuously improving and enhancing our platform to better serve your voting needs.

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
