import Logo from "@/presentation/logo/logo";
import { Tickets } from "lucide-react";

export function HeaderLogo(): React.ReactElement {
  const logoData = {
    linkHref: "#",
    linkIcon: <Tickets size={40} color="#ff6900" />,
  };

  const logoStyle = {};

  return <Logo logoData={logoData} logoStyle={logoStyle}></Logo>;
}
