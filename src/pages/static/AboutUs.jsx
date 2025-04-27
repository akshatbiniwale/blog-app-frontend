import React from "react";
import MainLayout from "../../components/MainLayout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
    const userInfo = useSelector((state) => state.user.userInfo);
	const navigate = useNavigate();

	const handleButtonClick = () => {
		if (userInfo) {
			navigate("/admin/posts/new");
		} else {
			navigate("/login");
		}
	};

	return (
		<MainLayout>
			<section className="container mx-auto px-5 py-10">
				<div className="text-center mb-10">
					<h1 className="text-4xl font-bold text-dark-soft mb-4">
						About Us
					</h1>
					<p className="text-lg text-dark-light">
						Discover how you can share your thoughts and connect
						with the world.
					</p>
				</div>
				<div className="flex flex-col items-center gap-6">
					<h2 className="text-2xl font-semibold text-dark-soft">
						Share Your Voice with the World
					</h2>
					<p className="text-dark-light text-center max-w-3xl">
						At our blog platform, we believe that everyone has a
						story to tell. Whether it's your personal experiences,
						professional insights, or creative ideas, this is the
						place to share them. Writing down your thoughts not only
						helps you express yourself but also allows you to
						connect with like-minded individuals across the globe.
					</p>
					<p className="text-dark-light text-center max-w-3xl">
						Our platform is designed to make it easy for you to
						create, publish, and share your content. With a
						supportive community and powerful tools, your words can
						inspire, educate, and entertain countless readers.
					</p>
					<div className="mt-6">
						<button
							className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300"
							onClick={handleButtonClick}
						>
							{userInfo
								? "Start Blogging Today"
								: "Login to Start Blogging"}
						</button>
					</div>
				</div>
			</section>
		</MainLayout>
	);
};

export default AboutUs;
