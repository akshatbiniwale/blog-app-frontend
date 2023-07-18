import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";

const labelClassName = "text-[#5A7184] font-semibold block";
const inputClassName =
    "placeholder:text-[#959EAD] text-dark-hard mb-3 rounded-lg px-5 py-4 font-semibold block outline-none border";

const RegistrationPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const submitHandler = (data) => {
        console.log(data);
    };

    return (
        <MainLayout>
            <section className="container mx-auto px-5 py-10">
                <div className="w-full max-w-sm mx-auto">
                    <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
                        Sign Up
                    </h1>
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
                        <div className="flex flex-col mb-6 w-full">
                            <label
                                htmlFor="confirmPassword"
                                className={labelClassName}
                            >
                                Confirm Password
                            </label>
                            <input
                                autoComplete="off"
                                type="password"
                                id="confirmPassword"
                                {...register("confirmPassword", {
                                    validate: (value) => {
                                        if (value !== watch("password")) {
                                            return "Passwords do not match";
                                        }
                                    },
                                    required: {
                                        value: true,
                                        message: "Confirmation is required",
                                    },
                                })}
                                placeholder="Enter confirm password"
                                className={
                                    inputClassName +
                                    (errors.confirmPassword
                                        ? " border-red-500"
                                        : " border-[#C3CAD9]")
                                }
                            />
                            {errors.confirmPassword?.message && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.confirmPassword?.message}
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
                            disabled={!isValid}
                            className="disabled:opacity-70 disabled:cursor-not-allowed bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6"
                        >
                            Register
                        </button>
                        <p className="text-sm font-semibold text-[#5A7184]">
                            Already have an account?{" "}
                            <Link to="login" className="text-primary">
                                Login Now
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
        </MainLayout>
    );
};

export default RegistrationPage;
