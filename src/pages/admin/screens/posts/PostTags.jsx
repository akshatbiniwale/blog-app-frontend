import React, { useState } from "react";
import TagsInput from "react-tagsinput";

const PostTags = ({ onTagsHandler }) => {
    const [tags, setTags] = useState([]);

    const handleChange = (newTags) => {
        setTags(newTags);
        onTagsHandler(tags);
    };

    return (
        <div>
            <TagsInput
                value={tags}
                onChange={handleChange}
                trimValue={true}
                confirmKeys={[13, 44, 32]}
                focusClass="my-focus-class"
            >
                Separate keywords with a comma, space bar, or enter key
            </TagsInput>
            <br />
            <input
                type="text"
                name="output"
                className="form-control"
                value={tags.join(", ")}
            />
        </div>
    );
};

export default PostTags;
