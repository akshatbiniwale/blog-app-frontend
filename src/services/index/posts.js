import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export const getAllPostsOfUser = async (
    token,
    searchKeyword = "",
    page = 1,
    limit = 12
) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data, headers } = await axios.get(
            `${API_BASE_URL}/api/posts/manage?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`,
            config
        );
        return { data, headers };
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};


export const getAllPosts = async (searchKeyword = "", page = 1, limit = 10, categories = []) => {
    try {
        const { data, headers } = await axios.get(
        `${API_BASE_URL}/api/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}&categories=${categories.join(",")}`
    );
    return { data, headers };
    } catch (error) {
        if (error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const getOnePost = async ({ slug }) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/posts/${slug}`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const deletePost = async ({ slug, token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.delete(
			`${API_BASE_URL}/api/posts/${slug}`,
			config
		);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const updatePost = async ({ updatedData, slug, token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(
            `${API_BASE_URL}/api/posts/${slug}`,
            updatedData,
            config
        );
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const createPost = async ({ postData, token }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`${API_BASE_URL}/api/posts/`, postData, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};
