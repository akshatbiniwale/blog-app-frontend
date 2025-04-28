import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
	deleteComment,
	getAllComments,
	updateComment,
} from "../../../../services/index/comments";
import DataTable from "../../components/dataTable";
import { images } from "../../../../constants";
import { Link } from "react-router-dom";

const Comments = () => {
	const {
		userState,
		currentPage,
		searchKeyword,
		data: commentsData,
		isLoading,
		isFetching,
		isLoadingDeleteData,
		queryClient,
		searchKeywordHandler,
		submitSearchKeywordHandler,
		deleteDataHandler,
		setCurrentPage,
	} = useDataTable({
		dataQueryFn: () =>
			getAllComments(
				userState.userInfo.token,
				searchKeyword,
				currentPage
			),
		dataQueryKey: "comments",
		deleteDataMessage: "Comment is deleted",
		mutateDeleteFn: ({ slug, token }) => {
			return deleteComment({
				commentId: slug,
				token,
			});
		},
	});

	const {
		mutate: mutateUpdateCommentCheck,
	} = useMutation({
		mutationFn: ({ token, check, commentId }) => {
			return updateComment({ token, check, commentId });
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries(["comments"]);
			toast.success(
				data?.check ? "Comment is approved" : "Comment is not approved"
			);
		},
		onError: (error) => {
			toast.error(error.message);
			console.log(error);
		},
	});

	return (
		<DataTable
			pageTitle="Manage Comments"
			dataListName="Comments"
			searchInputPlaceHolder="Search Comments..."
			searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
			searchKeywordOnChangeHandler={searchKeywordHandler}
			searchKeyword={searchKeyword}
			tableHeaderTitleList={[
				"Author",
				"Comment",
				"Post",
				"Created At",
				"Actions",
			]}
			isFetching={isFetching}
			isLoading={isLoading}
			data={commentsData?.data}
			setCurrentPage={setCurrentPage}
			currentPage={currentPage}
			headers={commentsData?.headers}
		>
			{commentsData?.data.map((comment, idx) => (
				<tr key={idx}>
					<td className="px-5 py-5 text-sm bg-white border-b border-gray-200"
					>
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<a href="/" className="relative block">
									<img
										src={
											comment?.user?.avatar
												? comment?.user?.avatar
												: images.userImage
										}
										alt={comment?.user?.name}
										className="mx-auto object-cover rounded-lg w-10 aspect-square"
									/>
								</a>
							</div>
							<div className="ml-3">
								<p className="text-gray-900 whitespace-no-wrap">
									{comment?.user?.name}
								</p>
							</div>
						</div>
					</td>
					<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
						{comment?.replyOnUser !== null && (
							<p className="text-gray-900 whitespace-no-wrap">
								In reply to{" "}
								<Link
									to={`/blog/${comment?.post?.slug}/#comment-${comment?._id}`}
									className="text-blue-500"
								>
									{comment?.replyOnUser?.name}
								</Link>
							</p>
						)}
						<p className="text-gray-900 whitespace-no-wrap">
							{comment?.desc}
						</p>
					</td>
					<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
						<p className="text-gray-900 whitespace-no-wrap">
							<Link
								to={`/blog/${comment?.post?.slug}`}
								className="text-blue-500"
							>
								{comment?.post?.title}
							</Link>
						</p>
					</td>
					<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
						<p className="text-gray-900 whitespace-no-wrap">
							{new Date(comment.createdAt).toLocaleDateString(
								"en-US",
								{
									day: "2-digit",
									month: "2-digit",
									year: "2-digit",
									hour: "numeric",
									minute: "numeric",
								}
							)}
						</p>
					</td>
					<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
						<div className="flex flex-col items-start space-y-2">
							<button
								disabled={isLoadingDeleteData}
								type="button"
								className={`${
									comment?.check
										? "text-yellow-600 hover:text-yellow-900"
										: "text-green-600 hover:text-green-900"
								} disabled:opacity-70 disabled:cursor-not-allowed`}
								onClick={() => {
									mutateUpdateCommentCheck({
										token: userState.userInfo.token,
										check: comment?.check ? false : true,
										commentId: comment._id,
									});
								}}
							>
								{comment?.check ? "Unapprove" : "Approve"}
							</button>
							<button
								disabled={isLoadingDeleteData}
								type="button"
								className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
								onClick={() => {
									deleteDataHandler({
										slug: comment?._id,
										token: userState.userInfo.token,
									});
								}}
							>
								Delete
							</button>
						</div>
					</td>
				</tr>
			))}
		</DataTable>
	);
};

export default Comments;
