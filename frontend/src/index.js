import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './dashboard/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

