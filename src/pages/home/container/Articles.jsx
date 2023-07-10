import React from "react";
import ArticleCard from "./ArticleCard";
import {FaArrowRight} from  'react-icons/fa'

const Articles = () => {
    return (
        <section className="flex flex-col container mx-auto px-5 py-10">
            <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
                <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
            </div>
            <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-3 py-2 rounded-lg">
                <span>More Articles</span>
                <FaArrowRight className="w-3"/>
            </button>
        </section>
    );
};

export default Articles;
