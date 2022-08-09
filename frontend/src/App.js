import "./App.css";
import LoginPage from "pages/LoginPage";
import KakaoRedirectHandler from "components/Login/OAuth/KakaoRedirectHandler";
import GoogleRedirectHandler from "components/Login/OAuth/GoogleRedirectHandler";
import FindIdPage from "pages/FindIdPage";
import WelcomePage from "pages/WelcomePage";
import RegisterPage from "pages/RegisterPage";
<<<<<<< HEAD
import FeedPage from "pages/FeedPage";
import Search from "components/Feed/Search/Search";
import FollowFeed from "components/Feed/Follow/FollowFeed";
import LatestFeed from "components/Feed/Latest/LatestFeed";
=======
import CreateFeedPage from "pages/CreateFeedPage";
>>>>>>> 6e8724f11544ef13a952c6959689fdb27d8f4d02

import { BrowserRouter, Routes, Route } from "react-router-dom";

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
<<<<<<< HEAD
        <Route path="/feed" element={<FeedPage />}>
          <Route path="follow" element={<FollowFeed />} />
          <Route path="latest" element={<LatestFeed />} />
          <Route path="search" element={<Search />} />
        </Route>
=======
        <Route path="/feed" element={<CreateFeedPage />} />
>>>>>>> 6e8724f11544ef13a952c6959689fdb27d8f4d02
      </Routes>
    </BrowserRouter>
  );
}

 export default App;
