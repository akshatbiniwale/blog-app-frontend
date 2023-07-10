import React from "react";
import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import Articles from "./container/Articles";
import CTA from "./container/CTA";

function HomePage() {
    return (
        <div>
            <MainLayout />
            <Hero />
            <Articles />
            <CTA />
        </div>
    );
}

export default HomePage;
