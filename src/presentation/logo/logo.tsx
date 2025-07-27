import Link from "next/link";
import { LogoProps } from "./interface";

function Logo({ logoData, logoStyle }: LogoProps): React.ReactElement {
  return (
    <Link href={logoData.linkHref} className={logoStyle.linkStyle}>
      {logoData.linkLabel}
      {logoData.linkIcon}
      <span className={logoStyle.spanStyle}>{logoData.spanLabel}</span>
    </Link>
  );
}

export default Logo;
