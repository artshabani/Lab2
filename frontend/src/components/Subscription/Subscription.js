import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

function Subscription(props) {

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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Card style={{ width: '30%', margin: '0 5px', height: '300px' }}>
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

                        <Card style={{ width: '30%', margin: '0 5px' }}>
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

                        <Card style={{ width: '30%', margin: '0 5px' }}>
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
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Subscription;