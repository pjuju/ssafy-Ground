import "./App.css";
import LoginPage from "pages/LoginPage";
import KakaoRedirectHandler from "components/Login/OAuth/KakaoRedirectHandler";
import GoogleRedirectHandler from "components/Login/OAuth/GoogleRedirectHandler";
import FindIdPage from "pages/FindIdPage";
import WelcomePage from "pages/WelcomePage";
import RegisterPage from "pages/RegisterPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Follow from "components/Feed/Follow/Follow";
import Latest from "components/Feed/Latest/Latest";
import FeedPage from "pages/FeedPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/oauth/callback/google"
          element={<GoogleRedirectHandler />}
        />
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler />}
        />
        <Route path="/findid" element={<FindIdPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/feed" element={<FeedPage />}>
          <Route path="follow" element={<Follow />} />
          <Route path="latest" element={<Latest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
