import { EditorContent, useEditor } from "@tiptap/react";
import MenuBar from "./MenuBar";
import { extensions } from "../../constants/extensions";

const Editor = ({ onDataChange, content, editable }) => {
    const editor = useEditor({
        editable,
        extensions: extensions,
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert prose-sm sm:prose-base lg:prose-md xl:prose-xl m-2 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            onDataChange(json);
        },
        content: content,
    });

    return (
        <div className="w-full relative">
            {editable && <MenuBar editor={editor} />}
            <EditorContent editor={editor} className="p-4 focus:outline-none" />
        </div>
    );
};

export default Editor;
