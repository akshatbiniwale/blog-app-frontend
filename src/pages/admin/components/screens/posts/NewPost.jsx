import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
    FaBold,
    FaCode,
    FaHighlighter,
    FaItalic,
    FaStrikethrough,
} from "react-icons/fa";
import { BsParagraph } from "react-icons/bs";
import { MdCode, MdHorizontalRule, MdRedo, MdUndo } from "react-icons/md";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { VscNewline } from "react-icons/vsc";
import { GoListOrdered } from "react-icons/go";
import {
    PiListBulletsBold,
    PiTextHFiveBold,
    PiTextHFourBold,
    PiTextHOneBold,
    PiTextHSixBold,
    PiTextHThreeBold,
    PiTextHTwoBold,
} from "react-icons/pi";
import React, { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";

const MenuBar = ({ editor }) => {
    const className = "text-white py-3 text-xl";
    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-row justify-evenly bg-primary rounded-se-lg rounded-ss-lg">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`${className} ${
                    editor.isActive("bold") ? "is-active" : ""
                }`}
            >
                <FaBold />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`${className} ${
                    editor.isActive("italic") ? "is-active" : ""
                }`}
            >
                <FaItalic />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`${className} ${
                    editor.isActive("strike") ? "is-active" : ""
                }`}
            >
                <FaStrikethrough />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`${className} ${
                    editor.isActive("code") ? "is-active" : ""
                }`}
            >
                <MdCode />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={`${className} ${
                    editor.isActive("highlight") ? "is-active" : ""
                }`}
            >
                <FaHighlighter />
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`${className} ${
                    editor.isActive("paragraph") ? "is-active" : ""
                }`}
            >
                <BsParagraph />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={`${className} ${
                    editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                }`}
            >
                <PiTextHOneBold />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`${className} ${
                    editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }`}
            >
                <PiTextHTwoBold />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={`${className} ${
                    editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                }`}
            >
                <PiTextHThreeBold />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={`${className} ${
                    editor.isActive("heading", { level: 4 }) ? "is-active" : ""
                }`}
            >
                <PiTextHFourBold />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={`${className} ${
                    editor.isActive("heading", { level: 5 }) ? "is-active" : ""
                }`}
            >
                <PiTextHFiveBold />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
                className={`${className} ${
                    editor.isActive("heading", { level: 6 }) ? "is-active" : ""
                }`}
            >
                <PiTextHSixBold />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`${className} ${
                    editor.isActive("bulletList") ? "is-active" : ""
                }`}
            >
                <PiListBulletsBold />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`${className} ${
                    editor.isActive("orderedList") ? "is-active" : ""
                }`}
            >
                <GoListOrdered />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`${className} ${
                    editor.isActive("codeBlock") ? "is-active" : ""
                }`}
            >
                <FaCode />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`${className} ${
                    editor.isActive("blockquote") ? "is-active" : ""
                }`}
            >
                <BiSolidQuoteAltLeft />
            </button>
            <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={`${className}`}
            >
                <MdHorizontalRule />
            </button>
            <button
                className={`${className}`}
                onClick={() => editor.chain().focus().setHardBreak().run()}
            >
                <VscNewline />
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className={`${className}`}
            >
                <MdUndo />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className={`${className}`}
            >
                <MdRedo />
            </button>
        </div>
    );
};

const NewPost = () => {
    const labelClassName = "text-black font-semibold block text-xl";
    const inputClassName =
        "placeholder:text-[#959EAD] w-full text-dark-hard my-5 rounded-lg px-3 py-2 font-semibold block outline-none border";
    const [photo, setPhoto] = useState(null);

    const editor = useEditor({
        extensions: [
            Highlight,
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            TextStyle.configure({ types: [ListItem.name] }),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
            Placeholder.configure({
                emptyNodeClass:
                    "first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
                placeholder: "Content goes here...",
            }),
        ],
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert prose-sm sm:prose-base lg:prose-md xl:prose-xl m-2 focus:outline-none",
            },
        },
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
    };

    return (
        <section className="container pb-7">
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
                    placeholder="Title goes here.."
                />
                <label htmlFor="caption" className={labelClassName}>
                    Caption
                </label>
                <input
                    type="text"
                    id="caption"
                    placeholder="Caption goes here.."
                    className={inputClassName}
                />
            </div>
            {/* editor */}
            <label className="text-black font-semibold ml-10 text-xl">
                Body
            </label>
            <div className="mx-10 my-7 flex flex-col justify-center border-2 border-primary rounded-xl">
                <MenuBar editor={editor} />
                <EditorContent
                    editor={editor}
                    className="p-4 focus:outline-none"
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
            <div>
                
            </div>
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
        </section>
    );
};

export default NewPost;
