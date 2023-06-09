import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditMovie(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [genreid, setGenreId] = useState('');
  const [trailer, setTrailer] = useState('');
  const [viewCount, setViewCount] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then(response => {
      setTitle(response.data.title);
      setGenreId(response.data.genreId);
      setDescription(response.data.description);
      setGenre(response.data.genre);
      setDuration(response.data.duration);
      setImage(response.data.image);
      setVideo(response.data.video);
      setTrailer(response.data.trailer);
      setViewCount(response.data.viewCount);
      console.log(response.data);
    });
  }, [id]);

  const handleSubmit = async event => {
    event.preventDefault();
    const updatedMovie = {
      id: id,
      title: title,
      genreId: genreid,
      description: description,
      genre: genre,
      duration: duration,
      image: image,
      video: video,
      trailer: trailer,
      viewCount: viewCount,
    };

    try {
      console.log(updatedMovie);
      await axios
        .put(`http://localhost:5000/api/movies`, updatedMovie)
        .then(then => console.log('Something'));
      navigate('/movies');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2>Edit Movie</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={event => setTitle(event.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={description}
                onChange={event => setDescription(event.target.value)}
                className="form-control"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Genre:</label>
              <input
                type="text"
                value={genre.name}
                onChange={event => setGenre(event.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Duration:</label>
              <input
                type="text"
                value={duration}
                onChange={event => setDuration(event.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                value={image}
                onChange={event => setImage(event.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Video URL:</label>
              <input
                type="text"
                value={video}
                onChange={event => setVideo(event.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Trailer:</label>
              <input
                type="text"
                value={trailer}
                onChange={event => setTrailer(event.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Viewcount:</label>
              <input
                type="text"
                value={viewCount}
                onChange={event => setViewCount(event.target.value)}
                className="form-control"
                readOnly
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditMovie;
