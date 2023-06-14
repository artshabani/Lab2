import React, { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import starImage from '../../assets/star.png';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSubscribe } from "../../redux/actions";

function Subscription(props) {
    const [clickedStates, setClickedStates] = useState(0);
    const modalRef = useRef(null);
    const dispatch = useDispatch();

    const state = useSelector(state => state);

    useEffect(() => {
        setClickedStates(state.subscribe);
    }, [state.subscribe]);

    const handleClick = (index) => {
        setClickedStates(index);
    };

    async function subscribe(subId) {
        await axios.post(`http://localhost:5000/api/subscription`, { subId: subId }).then((res) => {
            dispatch(setSubscribe(res.data))
            props.onHide()
        })
    }

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
                        <Card className={clickedStates === 1 ? "border-danger" : ""} style={{ width: '30%', margin: '0 5px', height: '300px' }} onClick={() => handleClick(1)}>
                            <Card.Body>
                                <Card.Title>Basic Subscription</Card.Title>
                                <Card.Text>
                                    <img src={starImage} alt="Star" style={{ height: '40px', width: '40px' }} />
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Text className="text-muted">
                                    Price: ${Math.floor(Math.random() * 10) + 1}/month
                                </Card.Text>
                            </Card.Footer>
                        </Card>

                        <Card className={clickedStates === 2 ? "border-danger" : ""} style={{ width: '30%', margin: '0 5px' }} onClick={() => handleClick(2)}>
                            <Card.Body>
                                <Card.Title>Standard Subscription</Card.Title>
                                <Card.Text>
                                    <img src={starImage} alt="Star" style={{ height: '40px', width: '40px' }} />
                                    <img src={starImage} alt="Star" style={{ height: '40px', width: '40px' }} />
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Text className="text-muted">
                                    Price: ${Math.floor(Math.random() * 20) + 10}/month
                                </Card.Text>
                            </Card.Footer>
                        </Card>

                        <Card className={clickedStates === 3 ? "border-danger" : ""} style={{ width: '30%', margin: '0 5px' }} onClick={() => handleClick(3)}>
                            <Card.Body>
                                <Card.Title>Premium Subscription</Card.Title>
                                <Card.Text>
                                    <img src={starImage} alt="Star" style={{ height: '40px', width: '40px' }} />
                                    <img src={starImage} alt="Star" style={{ height: '40px', width: '40px' }} />
                                    <img src={starImage} alt="Star" style={{ height: '40px', width: '40px' }} />
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
                    <Button onClick={() => subscribe(clickedStates)} className="btn btn-danger">Subscribe</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Subscription;