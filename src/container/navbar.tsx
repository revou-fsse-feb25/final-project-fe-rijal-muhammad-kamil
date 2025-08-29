import Navbar from "@/presentation/navbar/navbar";
import { CalendarPlus2, Compass } from "lucide-react";
import { useSession } from "next-auth/react";
import { NavbarDatas } from "@/presentation/navbar/interface";
import { signOut } from "next-auth/react";

export function HeaderMainNavbar(): React.ReactElement {
  const navbarDatas = [
    { isLink: true, linkHref: "#", linkIcon: <CalendarPlus2 size={20} color="#f54a00" />, linkLabel: "Create an event" },
    { isLink: true, linkHref: "#", linkIcon: <Compass size={20} color="#f54a00" />, linkLabel: "Explore events" },
  ];

  const navbarStyle = {
    navStyle: "order-last lg:order-frist flex",
    ulStyle: "flex items-center gap-2",
    liStyle: "p-2 rounded-lg transition-color duration-150 ease-in hover:bg-(--color-surface-2-transparant)",
    linkStyle: "font-semibold flex items-center gap-2",
  };

  return <Navbar navbarDatas={navbarDatas} navbarStyle={navbarStyle} />;
}

export function HeaderSecondaryNavbar(): React.ReactElement {
  const { data: session, status } = useSession();
  let navbarDatas: NavbarDatas[] = [
    { isLink: true, linkHref: "/login", linkLabel: "Sign in" },
    { isLink: true, linkHref: "/register", linkLabel: "Sign up" },
  ];

  if (status === "authenticated" && session?.user) {
    navbarDatas = [
      { isLink: true, linkHref: "/user-profile", linkLabel: "Profile" },
      { isLink: false, buttonLabel: "Logout", buttonOnClick: () => signOut({ callbackUrl: "/login" }) },
    ];
  }

  const navbarStyle = {
    navStyle: "order-first lg:order-last flex justify-end",
    ulStyle: "flex gap-2",
    liStyle: "font-semibold first:bg-(--color-surface-2-transparant) last:bg-orange-600 px-4 py-2 rounded-lg transition-color duration-150 ease-in last:hover:bg-orange-500",
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
    ulStyle: "flex gap-4",
    liStyle: "relative after:content-[''] after:w-full after:h-0.5 after:absolute after:bottom-0 after:left-0 after:rounded-full after:bg-white after:origin-right after:scale-x-0 after:transition-transform after:duration-150 after:ease-in hover:after:scale-x-100 hover:after:origin-left",
  };

  return <Navbar navbarDatas={navbarDatas} navbarStyle={navbarStyle} />;
}
