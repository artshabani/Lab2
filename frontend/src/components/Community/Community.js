import React, { useState } from 'react';
import './Cstyle.css';

function Community() {
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const filteredMovies = topics.filter(topic => {
        const regex = new RegExp(searchTerm, 'gi');
        const matchesSearchTerm =
            regex.test(topic.topic)
        //     regex.test(movie.genre.name) ||
        //     regex.test(movie.description);
        // const matchesSelectedCategory =
        //     selectedCategory === '' || movie.genre.name === selectedCategory;
        return matchesSearchTerm;
    });

    const handleNewTopic = (topic) => {
        setTopics([...topics, topic]);
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
            <div className="topics-container">
                {topics.length === 0 ? (
                    <p>No topics available</p>
                ) : (
                    <ul className="topics-list">
                        {topics.map((topic, index) => (
                            <li key={index} className="topic-item">
                                <h3>{topic}</h3>

                                {/* Render the list of comments for each topic */}
                                <h4>Comments</h4>
                                {comments.length === 0 ? (
                                    <p>No comments available</p>
                                ) : (
                                    <ul className="comments-list">
                                        {comments.map((comment, commentIndex) => (
                                            <li key={commentIndex} className="comment-item">
                                                <p>{comment}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Form to submit new comment */}
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const comment = e.target.comment.value;
                                        handleNewComment(comment);
                                        e.target.reset();
                                    }}
                                >
                                    <input type="text" name="comment" placeholder="Enter your comment" />
                                    <button type="submit">Add Comment</button>
                                </form>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Form to submit new topic */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const topic = e.target.topic.value;
                    handleNewTopic(topic);
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