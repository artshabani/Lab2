import React, { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

function Subscription(props) {
    const [clickedStates, setClickedStates] = useState([false, false, false]);
    const modalRef = useRef(null);

    const handleClick = (index) => {
        const newClickedStates = [...clickedStates];
        newClickedStates[index] = !newClickedStates[index];
        setClickedStates(newClickedStates);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setClickedStates([false, false, false]);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ display: 'flex' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Subscribe to Create Rooms
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Subscription Offers</h4>
                    <div ref={modalRef} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Card className={clickedStates[0] ? "border-danger" : ""} style={{ width: '30%', margin: '0 5px', height: '300px' }} onClick={() => handleClick(0)}>
                            <Card.Body>
                                <Card.Title>Basic Subscription</Card.Title>
                                <Card.Text>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Text className="text-muted">
                                    Price: ${Math.floor(Math.random() * 10) + 1}/month
                                </Card.Text>
                            </Card.Footer>
                        </Card>

                        <Card className={clickedStates[1] ? "border-danger" : ""} style={{ width: '30%', margin: '0 5px' }} onClick={() => handleClick(1)}>
                            <Card.Body>
                                <Card.Title>Standard Subscription</Card.Title>
                                <Card.Text>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Text className="text-muted">
                                    Price: ${Math.floor(Math.random() * 20) + 10}/month
                                </Card.Text>
                            </Card.Footer>
                        </Card>

                        <Card className={clickedStates[2] ? "border-danger" : ""} style={{ width: '30%', margin: '0 5px' }} onClick={() => handleClick(2)}>
                            <Card.Body>
                                <Card.Title>Premium Subscription</Card.Title>
                                <Card.Text>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Text className="text-muted">
                                    Price: ${Math.floor(Math.random() * 30) + 20}/month
                                </Card.Text>
                            </Card.Footer>
                        </Card>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger">Subscribe</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Subscription;