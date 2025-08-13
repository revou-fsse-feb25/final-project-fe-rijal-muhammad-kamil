export interface ErrorPopUpProps {
  title: string;
  text: string;
  onRetry?: () => void;
  isFetching?: boolean;
}
