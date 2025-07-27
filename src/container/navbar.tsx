import Navbar from "@/presentation/navbar/navbar";
import { CalendarPlus2, Compass } from "lucide-react";

export function HeaderMainNavbar(): React.ReactElement {
  const navbarDatas = [
    { isLink: true, linkHref: "#", linkIcon: <CalendarPlus2 size={20} color="#ff6900" />, linkLabel: "Create an event" },
    { isLink: true, linkHref: "#", linkIcon: <Compass size={20} color="#ff6900" />, linkLabel: "Explore events" },
  ];

  const navbarStyle = {
    navStyle: "order-last lg:order-frist flex",
    ulStyle: "flex gap-4",
    liStyle: "p-2 rounded-lg transition-color duration-150 ease-in hover:bg-(--color-surface)",
    linkStyle: "text-inherit font-semibold flex items-center gap-2",
  };

  return <Navbar navbarDatas={navbarDatas} navbarStyle={navbarStyle} />;
}

export function HeaderSecondaryNavbar(): React.ReactElement {
  const navbarDatas = [
    { isLink: true, linkHref: "#", linkLabel: "Sign in" },
    { isLink: true, linkHref: "#", linkLabel: "Sign up" },
  ];

  const navbarStyle = {
    navStyle: "order-first lg:order-last flex justify-end",
    ulStyle: "flex gap-2",
    liStyle: "text-inherit font-semibold first:bg-(--color-surface) last:bg-orange-500 px-5 py-2 rounded-lg transition-color duration-150 ease-in last:hover:bg-orange-400",
  };

  return <Navbar navbarDatas={navbarDatas} navbarStyle={navbarStyle} />;
}

export function HeaderThirdNavbar(): React.ReactElement {
  const navbarDatas = [
    { isLink: true, linkHref: "#", linkLabel: "xxx-xxx" },
    { isLink: true, linkHref: "#", linkLabel: "xxx-xxx" },
    { isLink: true, linkHref: "#", linkLabel: "xxx-xxx" },
    { isLink: true, linkHref: "#", linkLabel: "xxx-xxx" },
    { isLink: true, linkHref: "#", linkLabel: "xxx-xxx" },
    { isLink: true, linkHref: "#", linkLabel: "xxx-xxx" },
  ];

  const navbarStyle = {
    ulStyle: "flex gap-2",
    liStyle: "transition-color duration-150 ease-in hover:bg-(--color-bg-hover)",
    linkStyle: "text-white",
  };

  return <Navbar navbarDatas={navbarDatas} navbarStyle={navbarStyle} />;
}
