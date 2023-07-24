import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ArticleDetailsPage from "./pages/articleDetails/ArticleDetailsPage";
import RegistrationPage from "./pages/register/RegistrationPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/components/screens/Admin";
import Comment from "./pages/admin/components/screens/comments/Comment";
import NewPost from "./pages/admin/components/screens/posts/NewPost";
import ManagePost from "./pages/admin/components/screens/posts/ManagePost";

const App = () => {
    return (
        <div className="App font-opensans">
            <Routes>
                <Route index path="/" element={<HomePage />} />
                <Route path="/blog/:slug" element={<ArticleDetailsPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Admin />} />
                    <Route path="comments" element={<Comment />} />
                    <Route path="posts/new" element={<NewPost />} />
                    <Route path="posts/manage" element={<ManagePost />} />
                </Route>
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;
