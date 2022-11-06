import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./movieDetail.css";
import MovieDetailCarousel from "../Carousel/MovieDetailCarousel.jsx";
import axios from "axios";

function MovieDetail(props) {
  const user = props.user;
  const params = useParams();

  const [movieDetails, setMovieDetails] = useState("");
  const [videoDetail, setVideoDetail] = useState("");
  const [ratingReview, setRatingReview] = useState([
    { id: 1, rating_review: "7⭐ good movie" },
    { id: 2, rating_review: "8⭐ My favorite movie" },
    { id: 3, rating_review: "9⭐ Must watch" },
    { id: 5, rating_review: "10⭐ The best" },
  ]);
  const [star, setStar] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const [starValue, setStarValue] = useState(9);

  const [review, setReview] = useState("");

  const [prevReview, setprevReview] = useState();

  const handleStar = (e) => {
    setStarValue(star[e.target.value]);
  };

  const [index1, setIndex1] = useState(0);

  const fetchMovieDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=1b6c5548b651ca79c1b54bb8139164dc&page=1&language=en-us`
    );
    const data = await response.json();
    setMovieDetails(data);
  };

  const videoDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=1b6c5548b651ca79c1b54bb8139164dc&page=1&language=en-US`
    );
    const data = await response.json();
    setVideoDetail(data.results[0]?.key || "not available");
  };

  const reviewsFetch = async () => {
    // const response = await fetch(
    //   `http://localhost:3001/api/review/me/${params.id}`
    // );
    // const data = await response.json();
    // console.log(data);
    // setprevReview(data);
    axios
      .get(`http://localhost:3001/api/review/me/${params.id}`)
      .then(function (res) {
        setprevReview(res.data);
      });
  };

  useEffect(() => {
    reviewsFetch();
    fetchMovieDetails();
    videoDetails();
    // eslint-disable-next-line
  }, []);
  const [reCheckReview, setreCheckReview] = useState();
  useEffect(() => {
    reviewsFetch();
    console.log("called");
  }, [reCheckReview]);

  const {
    id,
    backdrop_path,
    overview,
    release_date,
    title,
    vote_average,
    vote_count,
    tagline,
  } = movieDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.log("First Login then try");
      alert("First Login then try");
    }
    if (!review) {
      console.log("Write something to post");
      alert("Write something to post");
    }
    if (user && review) {
      const movieId = params.id;

      let data = {
        user,
        starValue,
        review,
        movieId,
      };
      console.log(data);
      axios.post("http://localhost:3001/api/review/me/", data).then((res) => {
        console.log(res);
        setReview("");
        setreCheckReview(!reCheckReview);
      });
    }
  };

  return (
    <>
      <div className="firstRowWrapper">
        <div className="movieDetailss">
          <div className="innerText">
            <h3 className="innerTitle">
              Title : {title} <br /> <small>{tagline && tagline}</small>
            </h3>
            <h3 className="innerDate">Release date : {release_date}</h3>
          </div>
          <div className="innerOverview">
            <p>
              <b>Overview</b> : {overview}
            </p>
          </div>
        </div>

        <div className="movieIframe">
          <iframe
            className="youtubeVideo"
            src={`https://www.youtube.com/embed/${videoDetail}`}
            allowFullScreen="allowFullScreen"
            frameBorder="0"
          ></iframe>
        </div>
      </div>

      <div className="movieIframeWrapper">
        <div>
          <img
            className="movieImageBroad"
            src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
            alt=""
          />
        </div>
        <div className="prevReview">
          <ul>
            {prevReview
              ? prevReview.map((data) => {
                  return (
                    <li>
                      {data.user}:{data.review} :{data.rating}⭐
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="movieOverview">
          <div className="subMovieOverview">
            <h3>Average rating : {vote_average}/10⭐</h3>
            <h3>Vote Count : {vote_count}</h3>

            <h4 className="rateThis">Rate and review :</h4>

            <form onSubmit={handleSubmit}>
              <div className="starSelectedWrapper">
                <h4 className="giveStar">Star selected</h4>
                <div className="starSelection">
                  <label htmlFor="star">
                    <select name="star" id="star" onChange={handleStar}>
                      {star.map((st, key) => (
                        <option selected={index1 === key} key={key} value={key}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div>
                <textarea
                  name="review"
                  id=""
                  cols="45"
                  rows="6"
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                >
                  Write a review
                </textarea>
              </div>
              <div>
                <button className="postButton">POST</button>
              </div>
            </form>
          </div>
          <div className="reviewAndRating">
            <h3>Audience reviews</h3>
            {ratingReview.map((ratingReview) => {
              return (
                <h3 key={ratingReview.id}>{ratingReview.rating_review}</h3>
              );
            })}
          </div>
        </div>
      </div>

      <div className="movieCarousel">
        <h1 className="castAndCrewText">Cast</h1>
        <MovieDetailCarousel id={id} />
      </div>
    </>
  );
}

export default MovieDetail;

{
  /* <a
            rel="noreferrer"
            target="_blank"
            href={`https://www.youtube.com/watch?v=${videoDetail}`}
          >
            <button className="trailerButton">Watch on youtube</button>
          </a> */
}
