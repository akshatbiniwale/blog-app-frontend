import React, { useState } from "react";
import { images } from "../constants";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/users";
import { Link, useNavigate } from "react-router-dom";

const navItemsInfo = [
    { name: "Home", type: "link", href: "/" },
    { name: "Articles", type: "link", href: "/articles" },
    {
        name: "Pages",
        type: "dropdown",
        items: [
            { title: "About us", href: "/about" },
            { title: "Contact us", href: "/contact" },
        ],
    },
    { name: "Pricing", type: "link", href: "/pricing" },
    { name: "FaQ", type: "link", href: "/faq" },
];

const NavItem = (props) => {
    const [dropdown, setDropdown] = useState(false);

    const toggleDropdownHandler = () => {
        setDropdown((currState) => !currState);
    };
    return (
        <li className="relative group">
            {props.item.type === "link" ? (
                <>
                    <Link to={props.item.href} className="px-4 py-2">
                        {props.item.name}
                    </Link>
                    <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
                        /
                    </span>
                </>
            ) : (
                <div className="flex flex-col items-center">
                    <button
                        className="px-4 py-2 flex gap-x-1 items-center"
                        onClick={toggleDropdownHandler}
                    >
                        <span>{props.item.name}</span>
                        <MdOutlineKeyboardArrowDown />
                    </button>
                    <div
                        className={`${
                            dropdown ? "block" : "hidden"
                        } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                    >
                        <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                            {props.item.items.map((page) => (
                                <Link
                                    to={page.href}
                                    key={page.title}
                                    className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                                >
                                    {page.title}
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </li>
    );
};

const Header = () => {
    const navigate = useNavigate();
    const [navIsVisible, setNavIsVisible] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    const navVisibilityHandler = () => {
        setNavIsVisible((currState) => {
            return !currState;
        });
    };

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <section className="sticky top-0 right-0 left-0 z-50 bg-white">
            <header className="container mx-auto px-5 flex justify-between py-4 items-center">
                <Link to="/">
                    <img
                        className="w-16 lg:w-24"
                        src={images.Logo}
                        alt="logo"
                    />
                </Link>
                <div className="lg:hidden z-50">
                    {navIsVisible ? (
                        <AiOutlineClose
                            className="w-6 h-6"
                            onClick={navVisibilityHandler}
                        />
                    ) : (
                        <AiOutlineMenu
                            className="w-6 h-6"
                            onClick={navVisibilityHandler}
                        />
                    )}
                </div>
                <div
                    className={`${
                        navIsVisible ? "right-0" : "-right-full"
                    } transition-all duration-500 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
                >
                    <ul className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
                        {navItemsInfo.map((item) => {
                            return <NavItem key={item.name} item={item} />;
                        })}
                    </ul>
                    {userState.userInfo ? (
                        <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
                            <div className="relative group">
                                <div className="flex flex-col items-center">
                                    <button
                                        className="flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                                        onClick={() => {
                                            setProfileDropdown(
                                                !profileDropdown
                                            );
                                        }}
                                    >
                                        <span>Account</span>
                                        <MdOutlineKeyboardArrowDown />
                                    </button>
                                    <div
                                        className={`${
                                            profileDropdown ? "block" : "hidden"
                                        } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                                    >
                                        <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => {
                                                    navigate("/profile");
                                                }}
                                                className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                                            >
                                                Profile Page
                                            </button>
                                            <button
                                                onClick={logoutHandler}
                                                className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                                            >
                                                Logout
                                            </button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                            className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </header>
        </section>
    );
};

export default Header;
