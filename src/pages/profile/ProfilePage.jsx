import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../../services/index/users";

import MainLayout from "../../components/MainLayout";
import ProfilePicture from "./../../components/ProfilePicture";
import { userAction } from "../../store/reducers/userReducer";
import { toast } from "react-hot-toast";

const labelClassName = "text-[#5A7184] font-semibold block";
const inputClassName =
    "placeholder:text-[#959EAD] text-dark-hard mb-3 rounded-lg px-5 py-4 font-semibold block outline-none border";

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);

    const { data: profileData, isLoading: profileIsLoading } = useQuery({
        queryFn: () => {
            return getUserProfile({ token: userState.userInfo.token });
        },
        queryKey: ["profile"],
    });

    const { mutate } = useMutation({
        mutationFn: ({ name, email, password }) => {
            return updateProfile({
                token: userState.userInfo.token,
                userData: { name, email, password },
            });
        },
        onSuccess: (data) => {
            dispatch(userAction.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
            queryClient.invalidateQueries(["profile"]);
            toast.success("Profile is updated.");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    useEffect(() => {
        if (!userState.userInfo) {
            navigate("/");
        }
    }, [navigate, userState.userInfo]);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        values: {
            name: profileIsLoading ? "" : profileData.name,
            email: profileIsLoading ? "" : profileData.email,
        },
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const { name, email, password } = data;
        mutate({ name, email, password });
    };

    return (
        <MainLayout>
            <section className="container mx-auto px-5 py-10">
                <div className="w-full max-w-sm mx-auto">
                    <ProfilePicture avatar={profileData?.avatar} />
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="flex flex-col mb-6 w-full">
                            <label htmlFor="name" className={labelClassName}>
                                Name
                            </label>
                            <input
                                autoComplete="off"
                                type="text"
                                id="name"
                                {...register("name", {
                                    minLength: {
                                        value: 1,
                                        message:
                                            "Name must be at least 1 character",
                                    },
                                    required: {
                                        value: true,
                                        message: "Name is required",
                                    },
                                })}
                                placeholder="Enter name"
                                className={
                                    inputClassName +
                                    (errors.name
                                        ? " border-red-500"
                                        : " border-[#C3CAD9]")
                                }
                            />
                            {errors.name?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col mb-6 w-full">
                            <label htmlFor="email" className={labelClassName}>
                                Email
                            </label>
                            <input
                                autoComplete="off"
                                type="email"
                                id="email"
                                {...register("email", {
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Enter a valid email",
                                    },
                                    required: {
                                        value: true,
                                        message: "Email is required",
                                    },
                                })}
                                placeholder="Enter email"
                                className={
                                    inputClassName +
                                    (errors.email
                                        ? " border-red-500"
                                        : " border-[#C3CAD9]")
                                }
                            />
                            {errors.email?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col mb-6 w-full">
                            <label
                                htmlFor="password"
                                className={labelClassName}
                            >
                                New Password (optional)
                            </label>
                            <input
                                autoComplete="off"
                                type="password"
                                id="password"
                                {...register("password")}
                                placeholder="Enter new password"
                                className={
                                    inputClassName +
                                    (errors.password
                                        ? " border-red-500"
                                        : " border-[#C3CAD9]")
                                }
                            />
                            {errors.password?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={!isValid || profileIsLoading}
                            className="disabled:opacity-70 disabled:cursor-not-allowed bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </section>
        </MainLayout>
    );
};

export default ProfilePage;
