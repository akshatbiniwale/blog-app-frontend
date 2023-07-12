import React from "react";
import { images } from "../../constants";
import { MdReply, MdEdit, MdDelete } from "react-icons/md";
import CommentForm from "./CommentForm";

const Comment = ({
    comment,
    loggedInUserId,
    affectedCommented,
    setAffectedCommented,
    addComment,
    parentId = null,
    updateComment,
    deleteComment,
    replies,
}) => {
    const isUserLoggedIn = Boolean(loggedInUserId);
    const commentBelongsToUser = loggedInUserId === comment.user._id;
    const isReplying =
        affectedCommented &&
        affectedCommented.type === "REPLYING" &&
        affectedCommented._id === comment._id;
    const isEditing =
        affectedCommented &&
        affectedCommented.type === "EDITING" &&
        affectedCommented._id === comment._id;
    const repliedCommendId = parentId ? parentId : comment._id;
    const replyOneUserId = comment.user._id;

    return (
        <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg">
            <img
                src={images.PostProfileImage}
                alt="user-profile"
                className="w-9 h-9 object-cover rounded-lg"
            />
            <div className="flex-1 flex flex-col">
                <h5 className="font-bold text-dark-hard text-xs">
                    {comment.user.name}
                </h5>
                <span className="text-xs text-dark-light">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                    })}
                </span>
                {!isEditing && (
                    <p className="font-opensans mt=[10px] text-dark-light">
                        {comment.desc}
                    </p>
                )}
                {isEditing && (
                    <CommentForm
                        btnLabel="Update"
                        formCancelHandler={() => setAffectedCommented(null)}
                        formSubmitHandler={(value) =>
                            updateComment(value, comment._id)
                        }
                        initialText={comment.desc}
                    />
                )}
                <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
                    {isUserLoggedIn && (
                        <button
                            className="flex items-center space-x-2"
                            onClick={() =>
                                setAffectedCommented({
                                    type: "REPLYING",
                                    _id: comment._id,
                                })
                            }
                        >
                            <MdReply className="w-4 h-auto" />
                            <span>Reply</span>
                        </button>
                    )}
                    {commentBelongsToUser && (
                        <>
                            <button
                                className="flex items-center space-x-2"
                                onClick={() =>
                                    setAffectedCommented({
                                        type: "EDITING",
                                        _id: comment._id,
                                    })
                                }
                            >
                                <MdEdit className="w-4 h-auto" />
                                <span>Edit</span>
                            </button>
                            <button
                                className="flex items-center space-x-2"
                                onClick={() => deleteComment(comment._id)}
                            >
                                <MdDelete className="w-4 h-auto" />
                                <span>Delete</span>
                            </button>
                        </>
                    )}
                </div>
                {isReplying && (
                    <CommentForm
                        btnLabel="Reply"
                        formCancelHandler={() => setAffectedCommented(null)}
                        formSubmitHandler={(value) =>
                            addComment(value, repliedCommendId, replyOneUserId)
                        }
                    />
                )}
                {replies.length > 0 && (
                    <div>
                        {replies.map((reply) => (
                            <Comment
                                key={reply._id}
                                addComment={addComment}
                                affectedCommented={affectedCommented}
                                setAffectedCommented={setAffectedCommented}
                                comment={reply}
                                deleteComment={deleteComment}
                                updateComment={updateComment}
                                loggedInUserId={loggedInUserId}
                                replies={[]}
                                parentId={comment._id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
