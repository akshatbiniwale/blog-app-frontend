import axios from "axios";

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

        const { data } = await axios.post("/api/comments", {
            desc,
            slug,
            parent,
            replyOnUser,
        }, config);

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};
