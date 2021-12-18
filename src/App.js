import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';
import EditMovieForm from './components/EditMovieForm';
import AddMovieForm from "./components/AddMovieForm";
import axios from 'axios';


const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Step 8: * [ ] You will once again need to keep the server and state data in sync. In `App.js`, complete the `deleteMovie` method so that it receives an id, filters out any movie with that id and sets state to that resultant movie list.

  const deleteMovie = (id)=> {
    setMovies(movies.filter(item=>(item.id !== Number(id))));
  }

  const addToFavorites = (movie) => {
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>
            <Route path="/movies/edit/:id">
              {/* Step 1: First, we need to be able to navigate to the edit movie component. In App.js, add in the `<EditMovieForm> `component to the supplied edit route.*/}
              <EditMovieForm setMovies={setMovies}/> {/* Step 4: Don't forget to make sure that your server data and your local state are in sync! Make any changes the edit route needed to give the edit form access to App's `setMovies` method.*/}
            </Route>

            {/* Step 12: Add in a route that allows access to `AddMovieForm`*/}
            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies}/> {/* Step 15: * [ ] Make sure your component has access to and runs and modifications needed to global state and redirects to `/movies` after creation.*/}
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie}/> {/* Step 9: Pass `deleteMovie` into the appropriate component. */}
            </Route>
 
            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

