import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/index/users";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/reducers/userReducer";

import MainLayout from "../../components/MainLayout";

const labelClassName = "text-[#5A7184] font-semibold block";
const inputClassName =
    "placeholder:text-[#959EAD] text-dark-hard mb-3 rounded-lg px-5 py-4 font-semibold block outline-none border";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ name, email, password }) => {
            return login({ email, password });
        },
        onSuccess: (data) => {
            dispatch(userAction.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    useEffect(() => {
        if (userState.userInfo) {
            navigate("/");
        }
    }, [navigate, userState.userInfo]);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const { email, password } = data;
        mutate({ email, password });
    };

    return (
        <MainLayout>
            <section className="container mx-auto px-5 py-10">
                <div className="w-full max-w-sm mx-auto">
                    <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
                        Sign In
                    </h1>
                    <form onSubmit={handleSubmit(submitHandler)}>
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
                                Password
                            </label>
                            <input
                                autoComplete="off"
                                type="password"
                                id="password"
                                {...register("password", {
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 character",
                                    },
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                })}
                                placeholder="Enter password"
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
                        <Link
                            to="/forgot-password"
                            className="text-sm font-semibold text-primary"
                        >
                            Forgot Password?
                        </Link>
                        <button
                            type="submit"
                            disabled={!isValid || isLoading}
                            className="disabled:opacity-70 disabled:cursor-not-allowed bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6"
                        >
                            Login
                        </button>
                        <p className="text-sm font-semibold text-[#5A7184]">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
        </MainLayout>
    );
};

export default LoginPage;
