import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { getCommentsData } from "../../data/Comments";
import Comment from "./Comment";

const CommentsContainer = ({ className, loggedInUserId, comments }) => {
    
    const [affectedCommented, setAffectedCommented] = useState(null);



    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
        
        setAffectedCommented(null);
    };



    const updateCommentHandler = (value, commentId) => {
        
        setAffectedCommented(null);
    };

    const deleteCommentHandler = (commentId) => {

    };

    return (
        <div className={`${className}`}>
            <CommentForm
                btnLabel="Send"
                formSubmitHandler={addCommentHandler}
            />
            <div className="space-y-4 mt-8">
                {comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        loggedInUserId={loggedInUserId}
                        affectedCommented={affectedCommented}
                        setAffectedCommented={setAffectedCommented}
                        addComment={addCommentHandler}
                        updateComment={updateCommentHandler}
                        deleteComment={deleteCommentHandler}
                        replies={comment.replies}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentsContainer;
