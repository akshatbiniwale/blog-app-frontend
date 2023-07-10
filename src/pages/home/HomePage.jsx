import React from "react";
import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import Articles from "./container/Articles";

function HomePage() {
    return (
        <div>
            <MainLayout />
            <Hero />
            <Articles />
        </div>
    );
}

export default HomePage;
