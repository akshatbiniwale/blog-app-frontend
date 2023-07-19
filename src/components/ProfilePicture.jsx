import React, { Fragment, useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";

import { stables } from "../constants";
import CropEasy from "./crop/CropEasy";
import { createPortal } from "react-dom";

const ProfilePicture = ({ avatar }) => {
    const [openCrop, setOpenCrop] = useState(false);
    const [photo, setPhoto] = useState(null);

    const handleFileChange = (event)=> {
        const file = event.target.files[0];
        setPhoto({url: URL.createObjectURL(file), file: file});
        setOpenCrop(true);
    }

    return (
        <Fragment>
            {openCrop &&
                createPortal(
                    <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
                    document.getElementById("root-overlay")
                )}
            <div className="w-1/3 flex flex-col items-center gap-x-auto mb-10">
                <div className="relative w-44 h-44 rounded-full outline outline-offset-2 outline-1 outline-primary overflow-hidden my-7">
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
