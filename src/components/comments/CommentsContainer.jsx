import CommentForm from "./CommentForm";
import Comment from "./Comment";

import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
    createComment,
    deleteComment,
    updateComment,
} from "../../services/index/comments";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const CommentsContainer = ({
    className,
    loggedInUserId,
    comments,
    postSlug,
}) => {
    const [affectedCommented, setAffectedCommented] = useState(null);
    const userState = useSelector((state) => state.user);
    const queryClient = useQueryClient();

    const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
        useMutation({
            mutationFn: ({ desc, slug, parent, replyOnUser, token }) => {
                return createComment({
                    desc,
                    slug,
                    parent,
                    replyOnUser,
                    token,
                });
            },
            onSuccess: () => {
                toast.success(
                    "Comment added, will be visible after admin verifies it"
                );
            },
            onError: (error) => {
                toast.error(error.message);
                console.log("error");
            },
        });

    const { mutate: mutateUpdateComment } = useMutation({
        mutationFn: ({ desc, commentId, token }) => {
            return updateComment({ desc, commentId, token });
        },
        onSuccess: () => {
            toast.success("Comment updated");
            queryClient.invalidateQueries(["blog", postSlug]);
        },
        onError: (error) => {
            toast.error(error.message);
            console.log("error");
        },
    });

    const { mutate: mutateDeleteComment } = useMutation({
        mutationFn: ({ commentId, token }) => {
            return deleteComment({ commentId, token });
        },
        onSuccess: () => {
            toast.success("Comment deleted");
            queryClient.invalidateQueries(["blog", postSlug]);
        },
        onError: (error) => {
            toast.error(error.message);
            console.log("error");
        },
    });

    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
        mutateNewComment({
            desc: value,
            parent,
            replyOnUser,
            token: userState.userInfo.token,
            slug: postSlug,
        });
        setAffectedCommented(null);
    };

    const updateCommentHandler = (value, commentId) => {
        mutateUpdateComment({
            desc: value,
            commentId,
            token: userState.userInfo.token,
        });
        setAffectedCommented(null);
    };

    const deleteCommentHandler = (commentId) => {
        mutateDeleteComment({ commentId, token: userState.userInfo.token });
    };

    return (
        <div className={`${className}`}>
            <CommentForm
                btnLabel="Send"
                formSubmitHandler={addCommentHandler}
                loading={isLoadingNewComment}
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
