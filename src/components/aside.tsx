import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import PAGES from "@/constants/pages.ts";
import { cn } from "@/lib/utils.ts";

interface AsideLinkProps {
    to: string;
    children?: ReactNode;
}

const AsideLink = (props: AsideLinkProps) => {
    const { to, children } = props;
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cn({
                    "focus:outline-none focus:bg-gray-100": true,
                    "focus:ring-none": true,
                    "flex w-full text-sm font-medium": true,
                    "border border-slate-900/0": true,
                    "px-3 py-2 rounded-md": true,
                    "hover:bg-gray-100": !isActive,
                    "bg-slate-900 text-white": isActive,
                    "focus:ring focus:bg-slate-900": isActive,
                    "focus:ring-slate-900/20": isActive
                })
            }
        >
            {children}
        </NavLink>
    );
};

const Aside = () => {
    return (
        <div className="fixed h-full w-[300px] border-r">
            <div className="h-[52px] border-b" />

            <div className="px-4 pt-3 pb-2 space-y-1.5">
                {Object.values(PAGES).map((item, index) => (
                    <AsideLink key={index} to={item.path}>
                        {item.asideText}
                    </AsideLink>
                ))}
            </div>
        </div>
    );
};

export default Aside;
