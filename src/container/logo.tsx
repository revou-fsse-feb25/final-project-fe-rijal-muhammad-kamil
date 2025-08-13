import Logo from "@/presentation/logo/logo";
import { Tickets } from "lucide-react";

const logoData = {
  linkHref: "#",
  linkIcon: <Tickets size={36} color="#f54a00" />,
};

const logoStyle = {};

export function HeaderLogo(): React.ReactElement {
  return <Logo logoData={logoData} logoStyle={logoStyle}></Logo>;
}
