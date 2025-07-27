interface LogoData {
  linkHref: string;
  linkIcon?: React.ReactNode;
  linkLabel?: string;
  spanLabel?: string;
}

interface LogoStyle {
  linkStyle?: string;
  spanStyle?: string;
}

export interface LogoProps {
  logoData: LogoData;
  logoStyle: LogoStyle;
}
