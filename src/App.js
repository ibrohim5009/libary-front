import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Category from './components/category/Category';

function App() {
  return (
    <BrowserRouter>
      <div className="App flex">
        <Sidebar />
        <Routes>
          <Route path="/category" element={<Category />} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
