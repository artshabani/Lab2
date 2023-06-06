import React, { useEffect, useState } from 'react';
import './Cstyle.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

function Community() {
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const state = useSelector(state => state);

    useEffect(() => {
        getTopic();
    }, []);

    const filterCommunity = topics.filter(topic => {
        const regex = new RegExp(searchTerm, 'gi');
        const matchesSearchTerm =
            regex.test(topic.topic)
        return matchesSearchTerm;
    });

    const getTopic = async () => {
        await axios.get(`http://localhost:5000/api/community`).then((res) => {
            setTopics(res.data)
        })
    }

    const handleNewTopic = async (topic) => {
        const obj = {
            id: uuidv4(),
            topic: topic,
            username: state.user.username
        }
        console.log(obj)
        await axios.post(`http://localhost:5000/api/community`, obj).then((response) => {
            if (response.status === 200) {
                setTopics([...topics, obj]); 
            }
        })
    };

    const handleNewComment = (comment) => {
        setComments([...comments, comment]);
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search topics..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            {/* Render the list of topics */}
            <h1>These are the current Topics talked about: </h1>
            <div className="topics-container">
                {topics.length === 0 ? (
                    <p>No topics available</p>
                ) : (
                    <ul className="topics-list">
                        {filterCommunity.map((topic, index) => (
                            <li key={index} className="topic-item">
                                <h3>{topic.username}:</h3>
                                <h1>{topic.topic}</h1>
                                <Link to={`/topic/${topic.id}`}><button className='btn btn-primary'>Details</button></Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Form to submit new topic */}
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const topic = e.target.topic.value;
                    await handleNewTopic(topic); // Await the handleNewTopic function
                    e.target.reset();
                }}
            >
                <input type="text" name="topic" placeholder="Enter your topic" />
                <button type="submit">Add Topic</button>
            </form>

        </div>
    )
}

export default Community;