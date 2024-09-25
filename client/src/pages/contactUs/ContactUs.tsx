import React from 'react'
import './contactUs.css'

const ContactUs = () => {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <div className="contact-info">
                <div className="contact-info-label-input">
                    <p className="info-label">Email:</p>
                    <p className="info-input">
                        <a href="mailto:efrat.koskas@gmail.com">efrat.koskas@gmail.com</a>
                    </p>
                </div>

                <div className="contact-info-label-input">
                    <p className="info-label">Phone:</p>
                    <p className="info-input">050-050-050-0</p>
                </div>

                <div className="contact-info-label-input">
                    <p className="info-label">Address:</p>
                    <p className="info-input">Ashdod, ISRAEL</p>
                </div>
            </div>
        </div>
    )
}

export default ContactUs