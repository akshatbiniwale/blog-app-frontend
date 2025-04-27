import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const PostTags = ({ onTagsHandler }) => {
	const [tags, setTags] = useState([]);

	const handleChange = (newTags) => {
		setTags(newTags);
		onTagsHandler(newTags);
	};

	return (
		<div className="flex flex-col gap-4">
			<TagsInput
				value={tags}
				onChange={handleChange}
				inputProps={{
					placeholder: "Add tags...",
					className:
						"placeholder:text-gray-400 w-full text-dark-hard rounded-lg px-3 py-2 md-5 font-semibold block outline-none border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
				}}
				className="w-full rounded-lg custom-tags-input"
			/>
		</div>
	);
};

export default PostTags;
