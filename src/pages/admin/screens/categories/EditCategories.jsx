import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	getSingleCategory,
	updateCategory,
} from "../../../../services/index/postCategories";

const EditCategories = () => {
	const queryClient = useQueryClient();
	const [categoryTitle, setCategoryTitle] = useState("");
	const navigate = useNavigate();
	const { slug } = useParams();
	const userState = useSelector((state) => state.user);

	const { isLoading, isError } = useQuery({
		queryFn: () => getSingleCategory({ slug }),
		queryKey: ["categories", slug],
		onSuccess: (data) => {
			setCategoryTitle(data?.title);
		},
		refetchOnWindowFocus: false,
	});

	const { mutate: mutateUpdateCategory, isLoading: isLoadingUpdateCategory } =
		useMutation({
			mutationFn: ({ title, slug, token }) => {
				return updateCategory({
					title,
					slug,
					token,
				});
			},
			onSuccess: (data) => {
				queryClient.invalidateQueries(["categories", slug]);
				toast.success("Category is updated");
				navigate(`/admin/categories/manage/edit/${data._id}`, {
					replace: true,
				});
			},
			onError: (error) => {
				toast.error(error.message);
				console.log(error);
			},
		});

	const handleUpdateCategory = () => {
		if (!categoryTitle) return;
		mutateUpdateCategory({
			title: categoryTitle,
			slug,
			token: userState.userInfo.token,
		});
	};

	return (
		<div className="col-span-4 py-8">
			<h4 className="text-lg leading-tight">Update Category</h4>
			<div className="d-form-control w-full mt-6">
				<input
					value={categoryTitle}
					className="rounded-lg border-transparent appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
					onChange={(e) => setCategoryTitle(e.target.value)}
					placeholder="category title"
				/>
				<button
					disabled={isLoadingUpdateCategory || isLoading || isError}
					type="button"
					onClick={handleUpdateCategory}
					className="w-fit mt-3 bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70 ml-4"
				>
					Update Category
				</button>
			</div>
		</div>
	);
};

export default EditCategories;
