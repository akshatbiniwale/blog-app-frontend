import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createComment = async ({
    token,
    desc,
    slug,
    parent,
    replyOnUser,
}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(
            `${API_BASE_URL}/api/comments`,
            {
                desc,
                slug,
                parent,
                replyOnUser,
            },
            config
        );

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const updateComment = async ({ desc, commentId, token, check }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(
            `${API_BASE_URL}/api/comments/${commentId}`,
            {
                desc,
                check,
            },
            config
        );

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const deleteComment = async ({ commentId, token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.delete(
            `${API_BASE_URL}/api/comments/${commentId}`,
            config
        );

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const getAllComments = async (
	token,
	searchKeyword = "",
	page = 1,
	limit = 10
) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data, headers } = await axios.get(
			`${API_BASE_URL}/api/comments?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`,
			config
		);
		return { data, headers };
	} catch (error) {
		if (error.response && error.response.data.message)
			throw new Error(error.response.data.message);
		throw new Error(error.message);
	}
};
