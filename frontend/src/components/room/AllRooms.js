import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AllRooms() {
    const [rooms, setRooms] = useState(null)
    const [privacy, setPrivacy] = useState('public')
    const state = useSelector(state => state);

    useEffect(() => {
        getRoom();
    }, []);

    const getRoom = async () => {
        await axios.get(`http://localhost:5000/api/room`).then((res) => {
            setRooms(res.data)
            console.log(res.data)
        })
    }

    // const deleteRoom = async (id) => {
    //     await axios.delete(`http://localhost:5000/api/room/${id}`).then((res) => {
    //         const filteredRooms = rooms.filter((room) => room.id !== id);
    //         setRooms(filteredRooms);
    //     });
    // };

    function filerRooms(rooms) {
        return rooms.filter((room) => {
            if (privacy == 'public') {
                return room.public;
            }
            else if (privacy == 'private') {
                return !room.public;
            }
            else {
                return room.roomAdmin == state.user.email;
            }
        })
    }

    if (!rooms) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="d-flex justify-content-center mt-5 mb-5">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={() => setPrivacy('public')}>Public Rooms</button>
                    <button type="button" className="btn btn-primary" onClick={() => setPrivacy('private')}>Private Rooms</button>
                    {state.user && <button type="button" className="btn btn-success" onClick={() => setPrivacy('mine')}>My Rooms</button>}
                </div>
            </div>
            <div className="movie-list">
                {filerRooms(rooms).map((room) => (
                    <div className="movie-card">
                        <Link to={`/room/${room.id}`}>
                            <h3>{room.name}</h3>
                        </Link>
                        {/* {privacy === 'mine' &&
                            <button onClick={deleteRoom(room.id)} className="btn btn-danger">Delete Room</button>
                        } */}
                    </div>
                ))}
            </div>
        </>
    )
}
export default AllRooms;