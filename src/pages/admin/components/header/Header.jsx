import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";

import { Link } from "react-router-dom";
import { images } from "../../../../constants";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useWindowSize } from "@uidotdev/usehooks";

const MENU_ITEMS = [
	{
		title: "Comments",
		link: "/admin/comments",
		icon: <FaComments className="text-xl" />,
		name: "comments",
		type: "link",
	},
	{
		title: "Users",
		link: "/admin/users/manage",
		icon: <FaUser className="text-xl" />,
		name: "users",
		type: "link",
	},
	{
		title: "Posts",
		content: [
			{ title: "New", link: "/admin/posts/new" },
			{ title: "Manage", link: "/admin/posts/manage" },
			{ title: "Categories", link: "/admin/categories/manage" },
		],
		icon: <MdDashboard className="text-xl" />,
		name: "posts",
		type: "collapse",
	},
];

const Header = () => {
	const [isMenuActive, setIsMenuActive] = useState(false);
	const [activeNavName, setActiveNavName] = useState("posts");
	const windowSize = useWindowSize();

	useEffect(() => {
		if (windowSize.width < 1024) {
			setIsMenuActive(false);
		} else {
			setIsMenuActive(true);
		}
	}, [windowSize.width]);

	const toggleMenuHandler = () => {
		setIsMenuActive((prevState) => !prevState);
	};

	return (
		<header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
			{/* logo */}
			<Link to="/">
				<img src={images.Logo} alt="logo" className="w-16 lg:hidden" />
			</Link>
			{/* menu burger icon */}
			<div className="cursor-pointer lg:hidden">
				{isMenuActive ? (
					<AiOutlineClose
						className="w-6 h-6"
						onClick={toggleMenuHandler}
					/>
				) : (
					<AiOutlineMenu
						className="w-6 h-6"
						onClick={toggleMenuHandler}
					/>
				)}
			</div>
			{/* sidebar container */}
			{isMenuActive && (
				<div className="fixed inset-0 lg:static lg:h-full lg:w-full">
					{/* underlay */}
					<div
						className="fixed inset-0 bg-black opacity-50 lg:hidden"
						onClick={toggleMenuHandler}
					/>
					{/* sidebar */}
					<div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6">
						<Link to="/">
							<img
								src={images.Logo}
								alt="logo"
								className="w-16"
							/>
						</Link>
						<div className="mt-6 flex flex-col gap-y-[0.563rem]">
							{MENU_ITEMS.map((item, index) =>
								item.type === "link" ? (
									<NavItem
										key={index}
										title={item.title}
										link={item.link}
										icon={item.icon}
										name={item.name}
										activeNavName={activeNavName}
										setActiveNavName={setActiveNavName}
									/>
								) : (
									<NavItemCollapse
										key={index}
										title={item.title}
										content={item.content}
										icon={item.icon}
										name={item.name}
										activeNavName={activeNavName}
										setActiveNavName={setActiveNavName}
									/>
								)
							)}
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
