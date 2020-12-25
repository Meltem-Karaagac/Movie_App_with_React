import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Movies from './components/Movies'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import './App.css';

function App() {
  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const videoStyle = { marginTop: "13%", marginLeft: "50%", transform: "translate(-50%, -50%)" };

  const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"

  const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="


  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchMovies = async (API) => {
    setLoading(true)
    const { data } = await axios.get(API)
    console.log(data.results);
    setMovies(data.results)
    console.log(movies);
    setLoading(false)
  }

  useEffect(() => {
    fetchMovies(FEATURED_API)
  }, [])


  const handleOnSubmit = (e) => {
    e.preventDefault();
    searchTerm ? fetchMovies(SEARCH_API + searchTerm) : setSearchTerm('');
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
    console.log(e.target.value);

  }


  return (
    <div className="container">

      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
            name="" id="" />
        </form>
      </header>
      <div>
        <video style={videoStyle} src="/Videos/elsa.mp4" width="100%" height="300" controls >
        </video>
      </div>

      {loading ? <div style={style}>
        <Loader type="Oval" color="#00BFFF" height={100} width={100} timeout={8000} />  </div> : <div className="movie-container">
          {movies.map(movie =>
            <Movies key={movie.id} {...movie} />)}
        </div>}

    </div>
  );
}

export default App;
