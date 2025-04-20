import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getOnePost, updatePost } from "../../../../services/index/posts";
import { getAllCategories } from "../../../../services/index/postCategories";
import { Link, useParams } from "react-router-dom";
import MultiSelectTagDropdown from "../../components/select-dropdown/MultiSelectTagDropdown";
import ArticleDetailSkeleton from "../../../articleDetails/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import parseJsonToHtml from "../../../../utils/parseJsonToHtml";
import { HiOutlineCamera } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Editor from "../../../../components/editor/Editor";
import {
	categoryToOption,
	filterCategories,
} from "./../../../../utils/multiSelectTagUtils";

const promiseOptions = async (inputValue) => {
	const categoriesData = await getAllCategories();
	return filterCategories(inputValue, categoriesData);
};

const EditPost = () => {
	const inputClassName =
		"placeholder:text-[#959EAD] w-full text-dark-hard my-5 rounded-lg px-3 py-2 font-semibold block outline-none border";
	const labelClassName = "text-black font-semibold block text-xl";
	const { slug } = useParams();
	const queryClient = useQueryClient();
	const userState = useSelector((state) => state.user);
	const [photo, setPhoto] = useState(null);
	const [body, setBody] = useState(null);
	const [initialPhoto, setInitialPhoto] = useState(null);
	const [categories, setCategories] = useState(null);
	const [title, setTitle] = useState("");
	const [caption, setCaption] = useState("");

	const { data, isLoading, isError } = useQuery({
		queryFn: () => getOnePost({ slug }),
		queryKey: ["blog", slug],
	});

	const { mutate: mutateUpdatePost, isLoading: isLoadingUpdatePost } =
		useMutation({
			mutationFn: ({ updatedData, slug, token }) => {
				console.log("updatedData", updatedData);
				return updatePost({
					updatedData,
					slug,
					token,
				});
			},
			onSuccess: (data) => {
				queryClient.invalidateQueries(["blog", slug]);
				toast.success("Post is updated");
				setPhoto(null);
			},
			onError: (error) => {
				toast.error(error.message);
				console.log(error);
			},
		});

	useEffect(() => {
		if (!isLoading && !isError) {
			setInitialPhoto(data?.photo);
			setBody(data?.body);
			setCategories(data.categories.map((item) => item.value));
			setTitle(data?.title || "");
			setCaption(data?.caption || "");
		}
	}, [data, isError, isLoading]);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setPhoto(file);
	};

	const titleChangeHandler = (e) => {
		setTitle(e.target.value);
	};

	const captionChangeHandler = (e) => {
		setCaption(e.target.value);
	};

	const handleUpdatePost = async () => {
		let updatedData = new FormData();
		if (photo) {
			updatedData.append("postPicture", photo);
		}
		updatedData.append(
			"document",
			JSON.stringify({ body, categories, title, caption })
		);
		mutateUpdatePost({
			updatedData,
			slug,
			token: userState.userInfo.token,
		});
	};

	const handleDeleteImage = () => {
		if (window.confirm("Do you want to delete your Post picture?")) {
			setInitialPhoto(null);
			setPhoto(null);
		}
	};

	let isPostDataLoaded = !isLoading && !isError;

	return (
		<div>
			{isLoading ? (
				<ArticleDetailSkeleton />
			) : isError ? (
				<ErrorMessage message="Something went wrong." />
			) : (
				<section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
					<article className="flex-1">
						<label
							htmlFor="postPicture"
							className="w-full cursor-pointer"
						>
							{photo ? (
								<img
									src={URL.createObjectURL(photo)}
									alt={data?.title}
									className="rounded-xl w-full"
								/>
							) : initialPhoto ? (
								<img
									src={data?.photo}
									alt={data?.title}
									className="rounded-xl w-full"
								/>
							) : (
								<div className="w-full min-h-[200px] h-full bg-blue-50/50 flex justify-center items-center">
									<HiOutlineCamera className="w-7 h-auto text-primary" />
								</div>
							)}
						</label>
						<input
							type="file"
							className="sr-only"
							id="postPicture"
							onChange={handleFileChange}
						/>
						<button
							type="button"
							className="w-fit bg-red-500 text-sm text-white mt-5 font-semibold rounded-lg px-2 py-1"
							onClick={handleDeleteImage}
						>
							Delete Image
						</button>
						<div className="mt-4 flex gap-2">
							{data?.categories.map((category) => (
								<Link
									to={`/blog?category=${category.name}`}
									className="text-primary text-sm font-roboto inline-block md:text-base"
								>
									{category.name}
								</Link>
							))}
						</div>
						<label htmlFor="title" className={labelClassName}>
							Title
						</label>
						<input
							type="text"
							id="title"
							className={inputClassName}
							defaultValue={data?.title}
							onChange={titleChangeHandler}
							placeholder="Title goes here.."
							autoComplete="off"
						/>
						<label htmlFor="caption" className={labelClassName}>
							Caption
						</label>
						<input
							type="text"
							id="caption"
							className={inputClassName}
							defaultValue={data?.caption}
							onChange={captionChangeHandler}
							placeholder="Caption goes here.."
							autoComplete="off"
						/>
						<div className="my-5">
							{isPostDataLoaded && (
								<MultiSelectTagDropdown
									loadOptions={promiseOptions}
									defaultValue={data.categories.map(
										categoryToOption
									)}
									onChange={(newValue) =>
										setCategories(
											newValue.map((item) => item.value)
										)
									}
								/>
							)}
						</div>
						<div className="w-full my-7 flex flex-col border-2 border-primary rounded-xl">
							{isPostDataLoaded && (
								<Editor
									content={data?.body}
									editable={true}
									onDataChange={(data) => setBody(data)}
								/>
							)}
						</div>
						<button
							disabled={isLoadingUpdatePost}
							className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:opacity-70 disabled:cursor-not-allowed"
							onClick={handleUpdatePost}
							type="button"
						>
							Update Post
						</button>
					</article>
				</section>
			)}
		</div>
	);
};

export default EditPost;
