import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import KakaoRedirectHandler from "components/Login/OAuth/KakaoRedirectHandler";
import GoogleRedirectHandler from "components/Login/OAuth/GoogleRedirectHandler";
<<<<<<< HEAD
=======
import FindIdPage from './pages/FindId/FindIdPage';
>>>>>>> front

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
<<<<<<< HEAD
        <Route
          path="/oauth/callback/google"
          element={<GoogleRedirectHandler />}
        />
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler />}
        />
=======
        <Route path="/oauth/callback/google" element={<GoogleRedirectHandler />} />
        <Route path="/oauth/callback/kakao" element={<KakaoRedirectHandler />} />
        <Route path="/findid" element={<FindIdPage />} />
>>>>>>> front
      </Routes>
    </BrowserRouter>
  );
}

export default App;
