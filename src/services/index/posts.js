import axios from "axios";

export const getAllPosts = async (searchKeyword = "", page = 1, limit = 12) => {
    try {
        const { data, header } = await axios.get(
            `/api/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
        );
        return { data, header };
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const getOnePost = async ({ slug }) => {
    try {
        const { data } = await axios.get(`/api/posts/${slug}`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};
