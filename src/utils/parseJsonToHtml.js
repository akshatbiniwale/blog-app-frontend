import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import parse from "html-react-parser";

const parseJsonToHtml = (json) => {
	try {
		return parse(generateHTML(json, [StarterKit, Highlight]));
	} catch (error) {
		console.error("Error parsing JSON to HTML:", error);
		return "<p>Error rendering content</p>";
	}
};

export default parseJsonToHtml;
