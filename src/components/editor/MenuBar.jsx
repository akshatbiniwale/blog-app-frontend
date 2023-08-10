import {
    PiListBulletsBold,
    PiTextHFiveBold,
    PiTextHFourBold,
    PiTextHOneBold,
    PiTextHSixBold,
    PiTextHThreeBold,
    PiTextHTwoBold,
} from "react-icons/pi";
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

const MenuBar = ({ editor }) => {
    const className = "text-white py-3 text-xl";

    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap justify-evenly bg-primary rounded-se-lg rounded-ss-lg">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`${className} ${
                    editor.isActive("bold") ? "is-active" : ""
                }`}
            >
                <FaBold />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`${className} ${
                    editor.isActive("italic") ? "is-active" : ""
                }`}
            >
                <FaItalic />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`${className} ${
                    editor.isActive("strike") ? "is-active" : ""
                }`}
            >
                <FaStrikethrough />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`${className} ${
                    editor.isActive("code") ? "is-active" : ""
                }`}
            >
                <MdCode />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={`${className} ${
                    editor.isActive("highlight") ? "is-active" : ""
                }`}
            >
                <FaHighlighter />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`${className} ${
                    editor.isActive("paragraph") ? "is-active" : ""
                }`}
            >
                <BsParagraph />
            </button>
            <button
                type="button"
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
                type="button"
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
                type="button"
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
                type="button"
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
                type="button"
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
                type="button"
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
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`${className} ${
                    editor.isActive("bulletList") ? "is-active" : ""
                }`}
            >
                <PiListBulletsBold />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`${className} ${
                    editor.isActive("orderedList") ? "is-active" : ""
                }`}
            >
                <GoListOrdered />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`${className} ${
                    editor.isActive("codeBlock") ? "is-active" : ""
                }`}
            >
                <FaCode />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`${className} ${
                    editor.isActive("blockquote") ? "is-active" : ""
                }`}
            >
                <BiSolidQuoteAltLeft />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={`${className}`}
            >
                <MdHorizontalRule />
            </button>
            <button
                className={`${className}`}
                type="button"
                onClick={() => editor.chain().focus().setHardBreak().run()}
            >
                <VscNewline />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className={`${className}`}
            >
                <MdUndo />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className={`${className}`}
            >
                <MdRedo />
            </button>
        </div>
    );
};

export default MenuBar;
