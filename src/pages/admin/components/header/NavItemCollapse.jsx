import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavItemCollapse = ({
    content,
    title,
    icon,
    name,
    activeNavName,
    setActiveNavName,
}) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (activeNavName !== name) {
            setIsChecked(false);
        }
    }, [activeNavName, name]);

    return (
        <div className="collapse collapse-arrow bg-base-200 min-h-0 rounded-none py-2">
            <input
                type="checkbox"
                className="min-h-0 py-0"
                checked={isChecked && name === activeNavName}
                onChange={() => {
                    setIsChecked((preState) => !preState);
                    setActiveNavName(name);
                }}
            />
            <div
                className={`collapse-title min-h-0 py-0 pl-0 flex items-center gap-x-2 text-lg ${
                    name === activeNavName
                        ? "font-bold text-primary"
                        : "font-semibold text-[#A5A5A5]"
                }`}
            >
                {icon}
                {title}
            </div>
            <div className="collapse-content">
                <div className="mt-2 flex flex-col gap-y-2">
                    {content.map((item, index) => (
                        <Link to={item.link} key={index}>
                            <div className="text-sm ml-3 my-1 font-semibold text-[#A5A5A5]">
                                {item.title}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavItemCollapse;
