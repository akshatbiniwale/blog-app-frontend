import React from "react";
import {
    FaFacebookSquare,
    FaTwitterSquare,
    FaRedditSquare,
    FaWhatsappSquare,
} from "react-icons/fa";

const SocialShareButtons = ({ url, title }) => {
    return (
        <div className="w-full flex justify-between">
            <a href="/" target="_blank" rel="noreferrer">
                <FaFacebookSquare className="text-[#3B5998] w-12 h-auto" />
            </a>
            <a href="/" target="_blank" rel="noreferrer">
                <FaTwitterSquare className="text-[#00ACEE] w-12 h-auto" />
            </a>
            <a href="/" target="_blank" rel="noreferrer">
                <FaRedditSquare className="text-[#FF4500] w-12 h-auto" />
            </a>
            <a href="/" target="_blank" rel="noreferrer">
                <FaWhatsappSquare className="text-[#25D366] w-12 h-auto" />
            </a>
        </div>
    );
};

export default SocialShareButtons;
