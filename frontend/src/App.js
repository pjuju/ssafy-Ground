import "./App.css";
import LoginPage from "pages/LoginPage";
import KakaoRedirectHandler from "components/Login/OAuth/KakaoRedirectHandler";
import GoogleRedirectHandler from "components/Login/OAuth/GoogleRedirectHandler";
import FindIdPage from "pages/FindIdPage";
import WelcomePage from "pages/WelcomePage";
import RegisterPage from "pages/RegisterPage";
import FeedPage from "pages/FeedPage";
import Search from "components/Feed/Search/Search";
import FollowFeed from "components/Feed/Follow/FollowFeed";
import LatestFeed from "components/Feed/Latest/LatestFeed";
import CreateFeed from "components/Feed/Create/CreateFeed";
import UpdateFeed from "components/Feed/Update/UpdateFeed";
import MobileNotiPage from "pages/MobileNotiPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "pages/ProfilePage";
import ArticleDetail from "components/Feed/Detail/ArticleDetail";
import ProfileEdit from "components/Profile/ProfileEdit";
import Profile from "components/Profile/Profile";
import { AuthProvider } from "auth/AuthProvider";
import { ProtectedRoute } from "auth/ProtectedRoute";
import { LoginRoute } from "auth/LoginRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/register"
            element={
              <LoginRoute>
                <RegisterPage />
              </LoginRoute>
            }
          />
          <Route
            path="/"
            element={
              <LoginRoute>
                <LoginPage />
              </LoginRoute>
            }
          />
          <Route
            path="/oauth/callback/google"
            element={<GoogleRedirectHandler />}
          />
          <Route
            path="/oauth/callback/kakao"
            element={<KakaoRedirectHandler />}
          />
          <Route path="/findid" element={<FindIdPage />} />
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/feed" element={<FeedPage />}>
            <Route path="follow" element={<FollowFeed />} />
            <Route path="create" element={<CreateFeed />} />
            <Route path="update/:boardId" element={<UpdateFeed />} />
            <Route path="latest" element={<LatestFeed />} />
            <Route path="search" element={<Search />} />
            <Route path="detail/:boardId" element={<ArticleDetail />} />
          </Route>
          <Route path="/profile" element={<ProfilePage />}>
            <Route path=":userId" element={<Profile />} />
            <Route path="edit/:userId" element={<ProfileEdit />} />
          </Route>
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <MobileNotiPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
