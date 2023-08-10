import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import parse from "html-react-parser";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";

const parseJsonToHtml = (json) => {
    return parse(generateHTML(json, [Text, Paragraph, Document, StarterKit, Highlight]));
};

export default parseJsonToHtml;
