import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { getCommentsData } from "../../data/Comments";
import Comment from "./Comment";

const CommentsContainer = ({ className, loggedInUserId }) => {
    const [comments, setComments] = useState([]);
    const mainComments = comments.filter((comment) => comment.parent === null);
    const [affectedCommented, setAffectedCommented] = useState(null);

    useEffect(() => {
        (async () => {
            const commentData = await getCommentsData();
            setComments(commentData);
        })();
    }, []);

    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
        const newComment = {
            _id: (Math.random() * 100 + 1).toString(),
            user: {
                _id: "a",
                name: "Akshat Biniwale",
            },
            desc: value,
            post: "1",
            parent: parent,
            replyOnUser: replyOnUser,
            createdAt: new Date().toISOString(),
        };
        setComments((prevState) => {
            return [newComment, ...prevState];
        });
        setAffectedCommented(null);
    };

    const getRepliesHandler = (commentId) => {
        return comments
            .filter((comment) => comment.parent === commentId)
            .sort((a, b) => {
                return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                );
            });
    };

    const updateCommentHandler = (value, commentId) => {
        const updatedComments = comments.map((comment) => {
            if (comment._id === commentId) {
                return { ...comment, desc: value };
            }
            return comment;
        });
        setComments(updatedComments);
        setAffectedCommented(null);
    };

    const deleteCommentHandler = (commentId) => {
        const updatedComments = comments.filter((comment) => {
            return commentId !== comment._id;
        });
        setComments(updatedComments);
        setAffectedCommented(null);
    };

    return (
        <div className={`${className}`}>
            <CommentForm
                btnLabel="Send"
                formSubmitHandler={addCommentHandler}
            />
            <div className="space-y-4 mt-8">
                {mainComments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        loggedInUserId={loggedInUserId}
                        affectedCommented={affectedCommented}
                        setAffectedCommented={setAffectedCommented}
                        addComment={addCommentHandler}
                        updateComment={updateCommentHandler}
                        deleteComment={deleteCommentHandler}
                        replies={getRepliesHandler(comment._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommentsContainer;
