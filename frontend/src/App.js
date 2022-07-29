import "./App.css";
import LoginPage from "./pages/LoginPage";
import KakaoRedirectHandler from "components/Login/OAuth/KakaoRedirectHandler";
import GoogleRedirectHandler from "components/Login/OAuth/GoogleRedirectHandler";
import FindIdPage from "./pages/FindId/FindIdPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "pages/WelcomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/oauth/callback/google"
          element={<GoogleRedirectHandler />}
        />
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler />}
        />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/findid" element={<FindIdPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
