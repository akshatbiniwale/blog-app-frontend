import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllPosts } from "../../../../../services/index/posts";
import { images, stables } from "../../../../../constants";
import Pagination from "./../../../../../components/Pagination";

const ManagePost = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: postsData,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryFn: () => getAllPosts(searchKeyword, currentPage),
        queryKey: ["posts"],
    });

    const searchKeywordHandler = (event) => {
        setSearchKeyword(event.target.value);
    };

    const submitSearchKeywordHandler = (event) => {
        event.preventDefault();
        refetch();
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold">Manage Posts</h1>
            <div className="w-full px-4 mx-auto">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                        <h2 className="text-2xl leading-tight">Users</h2>
                        <div className="text-end">
                            <form
                                onSubmit={submitSearchKeywordHandler}
                                className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
                            >
                                <div className=" relative ">
                                    <input
                                        type="text"
                                        id='"form-subscribe-Filter'
                                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="Post Title"
                                        onChange={searchKeywordHandler}
                                        value={searchKeyword}
                                    />
                                </div>
                                <button
                                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                    type="submit"
                                >
                                    Filter
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Category
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Created At
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Tags
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading || isFetching ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="text-center py-10 w-full"
                                            >
                                                Loading..
                                            </td>
                                        </tr>
                                    ) : (
                                        postsData?.data.map((post, index) => (
                                            <tr key={index}>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <a
                                                                href="/"
                                                                className="relative block"
                                                            >
                                                                <img
                                                                    alt={
                                                                        post.title
                                                                    }
                                                                    src={
                                                                        post?.image
                                                                            ? stables.uploadFolderBaseUrl +
                                                                              post?.image
                                                                            : images.noImage
                                                                    }
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
                                                        {post.categories
                                                            .length > 0
                                                            ? post.categories[0]
                                                            : "Uncategorized"}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {new Date(
                                                            post.createdAt
                                                        ).toLocaleDateString(
                                                            "en-GB",
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
                                                        {post.tags.length > 0
                                                            ? post.tags.map(
                                                                  (
                                                                      tag,
                                                                      index
                                                                  ) => (
                                                                      <p
                                                                          key={
                                                                              index
                                                                          }
                                                                      >
                                                                          {tag}
                                                                          {post
                                                                              .tags
                                                                              .length -
                                                                              1 !==
                                                                              index &&
                                                                              ","}
                                                                      </p>
                                                                  )
                                                              )
                                                            : "No Tags"}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <a
                                                        href="/"
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            {!isLoading && (
                                <Pagination
                                    onPageChange={(page) =>
                                        setCurrentPage(page)
                                    }
                                    currentPage={currentPage}
                                    totalPageCount={JSON.parse(
                                        postsData?.headers?.["x-totalpagecount"]
                                    )}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagePost;
