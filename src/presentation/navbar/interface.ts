export interface NavbarDatas {
  isLink: boolean;
  linkHref?: string;
  linkIcon?: React.ReactNode;
  linkLabel?: string;
  linkHasSpan?: boolean;
  spanLabel?: string;

  buttonOnClick?: () => void;
  buttonIcon?: React.ReactNode;
  buttonLabel?: string;
  buttonHasSpan?: boolean;
  buttonSpanLabel?: string;
}

export interface NavbarProps {
  navbarDatas: NavbarDatas[];
  navbarStyle: {
    navStyle?: string;
    ulStyle?: string;
    liStyle?: string;
    linkStyle?: string;
    linkSpanStyle?: string;
    buttonStyle?: string;
    buttonSpanStyle?: string;
  };
}
