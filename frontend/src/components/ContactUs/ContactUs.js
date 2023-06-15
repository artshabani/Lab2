import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const obj = {
            Name: name,
            Email: email,
            Subject: subject,
            Message: message
        };
        console.log(obj)
        try {
            const response = await axios.post("http://localhost:5000/api/contact", obj);
            console.log(response); // Log the response for debugging

            if (response.status === 200) {
                console.log(obj); // Log the object for debugging
                window.location.href = "/ThankYou";
            } else {
                console.log("Request failed");
            }
        } catch (error) {
            console.error(error); // Log any errors for debugging
        }
        // await axios.post(`http://localhost:5000/api/contact`, obj).then((response) => {
        //     if (response.status === 200) {
        //         console.log(obj)
        //         //setMessage([...messages, obj]);
        //         window.location.href = "/ThankYou";
        //     } else {
        //         console.log("nope")
        //     }
        // })
    };

    return (
        <section className='card p-3 bg-light' style={{ width: 800, display: 'inline-block', top: 30 }}>
            <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
            <p className="text-center w-responsive mx-auto mb-5">
                Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.
            </p>
            <div className="row">
                <div className="col-md-9 mb-md-0 mb-5">
                    <form id="contact-form" name="contact-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="name">Your name</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="md-form mb-0">
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="email">Your email</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="md-form mb-0">
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="form-control"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                    <label htmlFor="subject">Subject</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="md-form">
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="2"
                                        className="form-control md-textarea"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                    <label htmlFor="message">Your message</label>
                                </div>
                            </div>
                        </div>
                        <div className="text-center text-md-left">
                            <button type="submit" className="btn btn-primary">
                                Send
                            </button>
                        </div>
                        <div className="status"></div>
                    </form>
                </div>
                <div className="col-md-3 text-center">
                    <ul className="list-unstyled mb-0">
                        <li>
                            <i className="fas fa-map-marker-alt fa-2x"></i>
                            <p>San Francisco, CA 94126, USA</p>
                        </li>
                        <li>
                            <i className="fas fa-phone mt-4 fa-2x"></i>
                            <p>+ 01 234 567 89</p>
                        </li>
                        <li>
                            <i className="fas fa-envelope mt-4 fa-2x"></i>
                            <p>contact@mdbootstrap.com</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
export default ContactUs;