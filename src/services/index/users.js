import axios from "axios";

// making api requests to the backend
// Axios is a promise-based HTTP client for JavaScript. It makes sending asynchronous HTTP requests to REST endpoints easier and helps you perform CRUD operations.

export const signUp = async ({ name, email, password }) => {
    try {
        const { data } = await axios.post("/api/users/register", {
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
        const { data } = await axios.post("/api/users/login", {
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
        const { data } = await axios.get("/api/users/profile", config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};

export const updateProfile = async ({ token, userData }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(
            "/api/users/updateProfile",
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
            "/api/users/updateProfilePicture",
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
