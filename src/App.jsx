import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Firstpg from './Components/Firstpg';
import Home from './Components/Home';
import './App.css';
import CreateReciepe from './Components/CreateReciepe';
import RecipeList from './Components/RecipeList';
import Recipedetails from './Components/Recipedetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Firstpg />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateReciepe/>}/>
        <Route path="/reci" element={<RecipeList />} />
        <Route path="/reci/:id" element={<Recipedetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
