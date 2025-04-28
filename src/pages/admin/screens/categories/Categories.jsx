import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDataTable } from "../../../../hooks/useDataTable";
import { createCategory, deleteCategory, getAllCategories } from "../../../../services/index/postCategories";
import DataTable from "../../components/dataTable";
import { useState } from "react";

const Categories = () => {
	const [categoryTitle, seTcategoryTitle] = useState("");

	const { mutate: mutateCreateCategory, isLoading: isLoadingCreateCategory } =
		useMutation({
			mutationFn: ({ token, title }) => {
				return createCategory({
					token,
					title,
				});
			},
			onSuccess: (data) => {
				queryClient.invalidateQueries(["categories"]);
				toast.success("Category is created");
			},
			onError: (error) => {
				toast.error(error.message);
				console.log(error);
			},
		});

	const {
		userState,
		currentPage,
		searchKeyword,
		data: categoriesData,
		isLoading,
		isFetching,
		isLoadingDeleteData,
		queryClient,
		searchKeywordHandler,
		submitSearchKeywordHandler,
		deleteDataHandler,
		setCurrentPage,
	} = useDataTable({
		dataQueryFn: () => getAllCategories(searchKeyword, currentPage),
		dataQueryKey: "categories",
		deleteDataMessage: "Category is deleted",
		mutateDeleteFn: ({ slug, token }) => {
			return deleteCategory({
				slug,
				token,
			});
		},
	});

	const handleCreateCategory = () => {
		mutateCreateCategory({
			token: userState.userInfo.token,
			title: categoryTitle,
		});
	};

	return (
		<div className="grid grid-cols-12 gap-x-4">
			<div className="col-span-4 py-8">
				<h4 className="text-lg leading-tight">Add New Category</h4>
				<div className="d-form-control w-full mt-6">
					<input
						value={categoryTitle}
						className="rounded-lg border-transparent appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
						onChange={(e) => seTcategoryTitle(e.target.value)}
						placeholder="category title"
					/>
					<button
						disabled={isLoadingCreateCategory}
						type="button"
						onClick={handleCreateCategory}
						className="w-fit mt-3 bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70 ml-4"
					>
						Add Category
					</button>
				</div>
			</div>
			<div className="col-span-8">
				<DataTable
					pageTitle=""
					dataListName="Categories"
					searchInputPlaceHolder="Category title..."
					searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
					searchKeywordOnChangeHandler={searchKeywordHandler}
					searchKeyword={searchKeyword}
					tableHeaderTitleList={["Title", "Created At", "Actions"]}
					isLoading={isLoading}
					isFetching={isFetching}
					data={categoriesData?.data}
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					headers={categoriesData?.headers}
					userState={userState}
				>
					{categoriesData?.data.map((category) => (
						<tr>
							<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
								<div className="flex items-center">
									<p className="text-gray-900 whitespace-no-wrap">
										{category.title}
									</p>
								</div>
							</td>
							<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
								<p className="text-gray-900 whitespace-no-wrap">
									{new Date(
										category.createdAt
									).toLocaleDateString("en-US", {
										day: "numeric",
										month: "short",
										year: "numeric",
									})}
								</p>
							</td>
							<td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
								<button
									disabled={isLoadingDeleteData}
									type="button"
									className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
									onClick={() => {
										deleteDataHandler({
											slug: category?._id,
											token: userState.userInfo.token,
										});
									}}
								>
									Delete
								</button>
								<Link
									to={`/admin/categories/manage/edit/${category?._id}`}
									className="text-green-600 hover:text-green-900"
								>
									Edit
								</Link>
							</td>
						</tr>
					))}
				</DataTable>
			</div>
		</div>
	);
};

export default Categories;
