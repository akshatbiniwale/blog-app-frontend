import axios from "axios";

// making api requests to the backend
// Axios is a promise-based HTTP client for JavaScript. It makes sending asynchronous HTTP requests to REST endpoints easier and helps you perform CRUD operations.

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const signUp = async ({ name, email, password }) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/api/users/register`, {
            name,
            email,
            password,
        });
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const login = async ({ email, password }) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/api/users/login`, {
            email,
            password,
        });
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const getUserProfile = async ({ token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const updateProfile = async ({ token, userData, userId }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(
            `${API_BASE_URL}/api/users/updateProfile/${userId}`,
            userData,
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

export const updateProfilePicture = async ({ token, formData }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(
            `${API_BASE_URL}/api/users/updateProfilePicture`,
            formData,
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

export const getAllUsers = async (
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
			`${API_BASE_URL}/api/users?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`,
			config
		);
		return { data, headers };
	} catch (error) {
		if (error.response && error.response.data.message)
			throw new Error(error.response.data.message);
		throw new Error(error.message);
	}
};

export const deleteUser = async ({ slug, token }) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.delete(
			`${API_BASE_URL}/api/users/${slug}`,
			config
		);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message)
			throw new Error(error.response.data.message);
		throw new Error(error.message);
	}
};
