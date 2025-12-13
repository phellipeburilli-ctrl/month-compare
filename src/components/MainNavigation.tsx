import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Video, Megaphone, Server, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    icon: React.ReactNode;
    children?: { label: string; path: string; icon: React.ReactNode }[];
    path?: string;
}

const navItems: NavItem[] = [
    {
        label: "Audiovisual",
        icon: <Video className="w-4 h-4" />,
        children: [
            { label: "VSLs", path: "/audiovisual/vsls", icon: <Video className="w-4 h-4" /> },
            { label: "ADS", path: "/audiovisual/ads", icon: <Megaphone className="w-4 h-4" /> },
        ],
    },
    {
        label: "Backend",
        icon: <Server className="w-4 h-4" />,
        children: [
            { label: "Funil", path: "/backend/funil", icon: <Server className="w-4 h-4" /> },
        ],
    },
    {
        label: "Resumo",
        icon: <TrendingUp className="w-4 h-4" />,
        path: "/resumo",
    },
];

export function MainNavigation() {
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const isPathActive = (path: string) => location.pathname === path;
    const isParentActive = (item: NavItem) => {
        if (item.children) {
            return item.children.some(child => location.pathname.startsWith(child.path));
        }
        return item.path ? location.pathname.startsWith(item.path) : false;
    };

    return (
        <nav className="flex items-center gap-1 p-1 rounded-xl bg-muted/50 border border-border backdrop-blur-sm">
            {navItems.map((item) => (
                <div key={item.label} className="relative">
                    {item.children ? (
                        <>
                            <button
                                onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                    isParentActive(item)
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                                )}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                                <ChevronDown
                                    className={cn(
                                        "w-4 h-4 transition-transform duration-200",
                                        openDropdown === item.label && "rotate-180"
                                    )}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {openDropdown === item.label && (
                                <div className="absolute top-full left-0 mt-2 min-w-[180px] rounded-xl bg-card border border-border shadow-xl shadow-black/20 overflow-hidden z-50 animate-fade-in">
                                    <div className="p-2 space-y-1">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.path}
                                                to={child.path}
                                                onClick={() => setOpenDropdown(null)}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                                    isPathActive(child.path)
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                )}
                                            >
                                                {child.icon}
                                                <span>{child.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link
                            to={item.path || "/"}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                isPathActive(item.path || "/")
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                            )}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    )}
                </div>
            ))}

            {/* Click outside to close dropdown */}
            {openDropdown && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenDropdown(null)}
                />
            )}
        </nav>
    );
}
