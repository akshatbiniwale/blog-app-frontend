import React from "react";
import {
    FaFacebookSquare,
    FaTwitterSquare,
    FaRedditSquare,
    FaWhatsappSquare,
} from "react-icons/fa";

const SocialShareButtons = ({ url, title }) => {
    const face_url =
        "https://www.facebook.com/dialog/share?app_id=" +
        process.env.REACT_APP_FACEBOOK_APP_ID +
        "&display=popup&href=" +
        url;
    const tweet_url = "https://twitter.com/intent/tweet?url=" + url;
    const reddit_url = "https://www.reddit.com/submit?url=" + url;
    const wa_url = "https://api.whatsapp.com/send/?text=" + url;

    return (
        <div className="w-full flex justify-between">
            <a href={face_url} target="_blank" rel="noreferrer">
                <FaFacebookSquare className="text-[#3B5998] w-12 h-auto" />
            </a>
            <a href={tweet_url} target="_blank" rel="noreferrer">
                <FaTwitterSquare className="text-[#00ACEE] w-12 h-auto" />
            </a>
            <a href={reddit_url} target="_blank" rel="noreferrer">
                <FaRedditSquare className="text-[#FF4500] w-12 h-auto" />
            </a>
            <a href={wa_url} target="_blank" rel="noreferrer">
                <FaWhatsappSquare className="text-[#25D366] w-12 h-auto" />
            </a>
        </div>
    );
};

export default SocialShareButtons;
