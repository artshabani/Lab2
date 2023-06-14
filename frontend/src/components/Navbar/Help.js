import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const HelpAndSupportPage = () => {
  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1>Help and Support</h1>
          <p>
            Welcome to our Help and Support page! If you have any questions or need assistance, please refer to the
            information below.
          </p>
          <h2>Frequently Asked Questions</h2>
          <p>Here are some common questions and their answers:</p>
          <ul>
            <li>Question 1: How do I create an account?</li>
            <li>Answer 1: To create an account, go to the Sign Up page and fill out the required information.</li>
            <li>Question 2: How do I start watching movies?</li>
            <li>Answer 2: To start watching movies, log in to your account and browse our collection. Click on a movie
              to view its details and click on the "Watch Now" button to start streaming.</li>
           
          </ul>
          <h2>Contact Us</h2>
          <p>If you couldn't find the answer to your question, please feel free to contact our support team:</p>
          <ul>
            <li>Email: medinasekiraqa@gmail.com</li>
            <li>Phone: 123-456-7890</li>
            <li>Live Chat: <a href="[Link to live chat]">Chat Now</a></li>
          </ul>
        </Col>
        <Col md={4}>
          <h2>Additional Resources</h2>
          <p>Here are some additional resources that might be helpful:</p>
          <ul>
          <li>Resource 1: <a href="[Link to user guide]">User Guide</a></li>
            <li>Resource 2: <a href="[Link to troubleshooting tips]">Troubleshooting Tips</a></li>

          
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default HelpAndSupportPage;
