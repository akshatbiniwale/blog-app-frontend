import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ArticleDetailsPage from "./pages/articleDetails/ArticleDetailsPage";
import RegistrationPage from "./pages/register/RegistrationPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login/LoginPage";

const App = () => {
    return (
        <div className="App font-opensans">
            <Routes>
                <Route index path="/" element={<HomePage />} />
                <Route path="/blog/:id" element={<ArticleDetailsPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;
