import Link from "next/link";
import { NavbarProps } from "./interface";

function Navbar({ navbarDatas, navbarStyle }: NavbarProps): React.ReactElement {
  return (
    <nav className={navbarStyle.navStyle}>
      <ul className={navbarStyle.ulStyle}>
        {navbarDatas.map((navbarData, index) => (
          <li key={index} className={navbarStyle.liStyle}>
            {navbarData.isLink ? (
              <Link href={navbarData.linkHref || ""} className={navbarStyle.linkStyle}>
                {navbarData.linkIcon}
                {navbarData.linkLabel}
                {navbarData.linkHasSpan && <span className={navbarStyle.linkSpanStyle}>{navbarData.spanLabel}</span>}
              </Link>
            ) : (
              <button onClick={navbarData.buttonOnClick} className={navbarStyle.buttonStyle}>
                {navbarData.buttonIcon}
                {navbarData.buttonLabel}
                {navbarData.buttonHasSpan && <span className={navbarStyle.buttonSpanStyle}>{navbarData.buttonSpanLabel}</span>}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
