import {
	deletePost,
    getAllPosts,
} from "../../../../services/index/posts";
import { Link } from "react-router-dom";

import images from "./../../../../constants/images";
import DataTable from "./../../components/dataTable";
import { useDataTable } from "../../../../hooks/useDataTable";

const ManagePosts = () => {
	const {
		userState,
		currentPage,
		searchKeyword,
		data: postsData,
		isLoading,
		isFetching,
		isLoadingDeleteData,
		searchKeywordHandler,
		submitSearchKeywordHandler,
		deleteDataHandler,
		setCurrentPage,
	} = useDataTable({
		dataQueryFn: () => getAllPosts(searchKeyword, currentPage),
		dataQueryKey: "posts",
		deleteDataMessage: "Post is deleted",
		mutateDeleteFn: ({ slug, token }) => {
			return deletePost({
				slug,
				token,
			});
		},
	});

	return (
		<DataTable
			pageTitle="Manage Posts"
			dataListName="Posts"
			searchInputPlaceHolder="Post title..."
			searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
			searchKeywordOnChangeHandler={searchKeywordHandler}
			searchKeyword={searchKeyword}
			tableHeaderTitleList={[
				"Title",
				"Category",
				"Created At",
				"Tags",
				"",
			]}
			isLoading={isLoading}
			isFetching={isFetching}
			data={postsData?.data}
			setCurrentPage={setCurrentPage}
			currentPage={currentPage}
			headers={postsData?.headers}
			userState={userState}
		>
			{postsData?.data.map((post, idx) => (
				<tr key={idx}>
					<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<a href="/" className="relative block">
									<img
										src={
											post?.photo
												? post?.photo
												: images.samplePostImage
										}
										alt={post.title}
										className="mx-auto object-cover rounded-lg w-10 aspect-square"
									/>
								</a>
							</div>
							<div className="ml-3">
								<p className="text-gray-900 whitespace-no-wrap">
									{post.title}
								</p>
							</div>
						</div>
					</td>
					<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
						<p className="text-gray-900 whitespace-no-wrap">
							{post?.categories?.length > 0
								? post?.categories
										.slice(0, 3)
										.map(
											(category, index) =>
												`${category?.title}${
													post?.categories.slice(0, 3)
														.length ===
													index + 1
														? ""
														: ", "
												}`
										)
								: "Uncategorized"}
						</p>
					</td>
					<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
						<p className="text-gray-900 whitespace-no-wrap">
							{new Date(post.createdAt).toLocaleDateString(
								"en-US",
								{
									day: "numeric",
									month: "short",
									year: "numeric",
								}
							)}
						</p>
					</td>
					<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
						<div className="flex gap-x-2">
							{post?.tags?.length > 0
								? post?.tags?.map((tag, index) => (
										<p key={index}>
											{tag}
											{post?.tags?.length - 1 !== index &&
												","}
										</p>
								  ))
								: "No tags"}
						</div>
					</td>
					<td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
						<button
							disabled={isLoadingDeleteData}
							type="button"
							className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
							onClick={() => {
								deleteDataHandler({
									slug: post?.slug,
									token: userState.userInfo.token,
								});
							}}
						>
							Delete
						</button>
						<Link
							to={`/admin/posts/manage/edit/${post?.slug}`}
							className="text-green-600 hover:text-green-900"
						>
							Edit
						</Link>
					</td>
				</tr>
			))}
		</DataTable>
	);
};

export default ManagePosts;
