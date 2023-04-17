import styled from 'styled-components';
import React from "react";
import ImgSlider from './ImageSlider';
import Viewers from './Viewers';
import Recommends from './Recommends';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Trending from './Trending';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';

const Home = (props) => {
  // useDispatch is a function that allows to send actions to the store 
  // in order to make changes to the data in it. 
  const dispatch = useDispatch();
  // useSelector is a hook used to select the value in the selector function selectUserName.
  const userName = useSelector(selectUserName);
  // useRef is used here to persist the value of each of the arrays that contains 
  // the different types of movies displayed in the 'home' page of the app. 
  // every time the callback is executed in the 'useEffect' hook below, 
  // the data in the arrays will be removed so using useRef helps the current value of 
  // the arrays to persist across the renders. 
  const recommendsRef = useRef([]);
  const newDisneysRef = useRef([]);
  const originalsRef = useRef([]);
  const trendingRef = useRef([]);

  useEffect(() => {
    // db is an object with multiple methods that is imported from the 
    // firebase library. The 'movies' collection is accessed 
    // onSnapshot is a method of collection() which trakcs real-time changes
    // to the collection. The callback inside of it is executed every time a change
    // a the data in the collection changes.  
    // This callback will only change once
    db.collection("movies").onSnapshot((snapshot) => {
      // every time the snapshot starts, the temporary array are created 
      // in which specific movies are added. 
      const tempRecommends = [];
      const tempNewDisneys = [];
      const tempOriginals = [];
      const tempTrending = [];
      // here a specific snapshot of the 'movies' collection is iterated. Each document 
      // of the collection has a property called 'type'. This property is checked and 
      // based on its value, the document is added to a certain tmeporary array. 
      snapshot.docs.forEach((doc) => {
        const movie = { id: doc.id, ...doc.data() };
        switch (movie.type) {
          case "recommend":
            tempRecommends.push(movie);
            break;

          case "new":
            tempNewDisneys.push(movie);
            break;

          case "original":
            tempOriginals.push(movie);
            break;

          case "trending":
            tempTrending.push(movie);
            break;
          
          default:
            console.error(`Unknown movie type: ${movie.type}`);
            break;
        }
      });
      // the original arrays defined outside the 'useEffect' hook take the current 
      // value of the temporary arrays, and despite the fact the temporary arrays 
      // lose their value each time the callback is executed, the original arrays 
      // always manage to keep it. 
      recommendsRef.current = tempRecommends;
      newDisneysRef.current = tempNewDisneys;
      originalsRef.current = tempOriginals;
      trendingRef.current = tempTrending;
      // setMovies in this case is used as an action creator that contains several 
      // properties as its payload. When the setMovies receives this action it will update
      // the properties of the state object using the values of the action payload. 
      dispatch(
        setMovies({
          recommend: recommendsRef.current,
          newDisney: newDisneysRef.current,
          original: originalsRef.current,
          trending: trendingRef.current,
        })
      );
    });
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};


const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;