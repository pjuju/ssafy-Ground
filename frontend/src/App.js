import './App.css';
import FindIdPage from './pages/FindId/FindIdPage';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/findid" element={<FindIdPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
