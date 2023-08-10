import React, { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../../../../services/index/posts";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Editor from "../../../../../components/editor/Editor";
import PostTags from "./PostTags";

const NewPost = () => {
    const labelClassName = "text-black font-semibold block text-xl";
    const inputClassName =
        "placeholder:text-[#959EAD] w-full text-dark-hard my-5 rounded-lg px-3 py-2 font-semibold block outline-none border";
    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [body, setBody] = useState(null);
    const [tags, setTags] = useState([]);
    const userState = useSelector((state) => state.user);

    const { mutate } = useMutation({
        mutationFn: ({ postData, token }) => {
            return createPost({
                postData,
                token,
            });
        },
        onSuccess: () => {
            toast.success("Post created");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
    };

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const captionChangeHandler = (event) => {
        setCaption(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const postData = {
            title,
            caption,
            body,
        };

        let updatedData = new FormData();

        updatedData.append("postPicture", photo);
        updatedData.append("document", JSON.stringify(postData));

        mutate({ postData: updatedData, token: userState.userInfo.token });

        setPhoto(null);
        setTitle("");
        setCaption("");
        setBody("");
    };

    return (
        <form className="container pb-7" onSubmit={submitHandler}>
            {/* heading */}
            <h1 className="text-2xl font-semibold mb-10">New Post</h1>
            {/* title and caption */}
            <div className="mx-10 mb-7">
                <label htmlFor="title" className={labelClassName}>
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className={inputClassName}
                    value={title}
                    autoComplete="off"
                    onChange={titleChangeHandler}
                    placeholder="Title goes here.."
                />
                <label htmlFor="caption" className={labelClassName}>
                    Caption
                </label>
                <input
                    type="text"
                    id="caption"
                    autoComplete="off"
                    placeholder="Caption goes here.."
                    value={caption}
                    onChange={captionChangeHandler}
                    className={inputClassName}
                />
            </div>
            {/* editor */}
            <label className="text-black font-semibold ml-10 text-xl">
                Body
            </label>
            <div className="mx-10 my-7 flex flex-col justify-center border-2 border-primary rounded-xl">
                <Editor
                    editable={true}
                    content={(prevBody) => prevBody}
                    onDataChange={(data) => setBody(data)}
                />
            </div>
            {/* post image */}
            <label className="text-black font-semibold text-xl ml-10">
                Image
            </label>
            <div className="mx-10 pt-7">
                <label htmlFor="postPicture" className="w-full cursor-pointer">
                    {photo ? (
                        <img
                            src={URL.createObjectURL(photo)}
                            alt="post   "
                            className="rounded-xl w-full"
                        />
                    ) : (
                        <div className="w-full min-h-[200px] h-full bg-blue-50/50 flex justify-center items-center">
                            <HiOutlineCamera className="w-7 h-auto text-primary" />
                        </div>
                    )}
                </label>
                <input
                    type="file"
                    className="sr-only"
                    id="postPicture"
                    onChange={handleFileChange}
                />
            </div>
            {/* tags */}
            {/* <label className="text-black font-semibold text-xl ml-10">
                Tags
            </label>
            <PostTags onTagsHandler={(tags) => setTags(tags)} /> */}
            {/* submit button */}
            <div className="mx-10 pt-7 flex flex-row justify-between">
                <button
                    className="bg-green-500 text-white w-1/2 mx-5 font-semibold rounded-lg px-4 py-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    type="submit"
                >
                    Post
                </button>
                <button className="bg-red-500 text-white w-1/2 mx-5 font-semibold rounded-lg px-4 py-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    Discard
                </button>
            </div>
        </form>
    );
};

export default NewPost;
