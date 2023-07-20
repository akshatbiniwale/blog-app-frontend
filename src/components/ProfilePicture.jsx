import React, { Fragment, useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";

import { stables } from "../constants";
import CropEasy from "./crop/CropEasy";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../services/index/users";
import { userAction } from "../store/reducers/userReducer";

const ProfilePicture = ({ avatar }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);
    const [openCrop, setOpenCrop] = useState(false);
    const [photo, setPhoto] = useState(null);

    const { mutate } = useMutation({
        mutationFn: ({ token, formData }) => {
            return updateProfilePicture({
                token: token,
                formData: formData,
            });
        },
        onSuccess: (data) => {
            dispatch(userAction.setUserInfo(data));
            setOpenCrop(false);
            localStorage.setItem("account", JSON.stringify(data));
            queryClient.invalidateQueries(["profile"]);
            toast.success("Profile picture is deleted");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPhoto({ url: URL.createObjectURL(file), file: file });
        setOpenCrop(true);
    };

    const handleDeleteImage = () => {
        if (window.confirm("Do you want to delete you profile picture?")) {
            try {
                const formData = new FormData();
                formData.append("profilePicture", undefined);

                mutate({ token: userState.userInfo.token, formData: formData });
            } catch (error) {
                toast.error(error.message);
                console.log(error);
            }
        }
    };

    return (
        <Fragment>
            {openCrop &&
                createPortal(
                    <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
                    document.getElementById("root-overlay")
                )}
            <div className="w-full flex items-center justify-between gap-x-4 mb-7 lg:mb-10 lg:flex-col lg:w-1/4">
                <div className="relative lg:my-7 lg:w-44 lg:h-44 w-24 h-24 rounded-full outline outline-offset-2 outline-1 outline-primary overflow-hidden">
                    <label
                        htmlFor="profilePicture"
                        className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
                    >
                        {avatar ? (
                            <img
                                src={stables.uploadFolderBaseUrl + avatar}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                                <HiOutlineCamera className="w-7 h-auto text-primary" />
                            </div>
                        )}
                    </label>
                    <input
                        type="file"
                        className="sr-only"
                        id="profilePicture"
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    onClick={handleDeleteImage}
                    type="button"
                    className="hover:text-white hover:bg-red-500 border border-red-500 rounded-lg px-4 py-2 text-red-500"
                >
                    Delete
                </button>
            </div>
        </Fragment>
    );
};

export default ProfilePicture;
