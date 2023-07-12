import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ArticleDetailsPage from "./pages/articleDetails/ArticleDetailsPage";

const App = () => {
    return (
        <div className="App font-opensans">
            <Routes>
                <Route index path="/" element={<HomePage />} />
                <Route
                    index
                    path="/blog/:id"
                    element={<ArticleDetailsPage />}
                />
            </Routes>
        </div>
    );
};

export default App;
