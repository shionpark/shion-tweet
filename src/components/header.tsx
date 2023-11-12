import { useRouter } from "next/router";

interface HeaderProps {
  canGoBack?: boolean;
  title?: string;
}

const Header = ({ canGoBack, title }: HeaderProps) => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div className="text-gray-900 bg-white text-lg font-medium py-3 border-b shadow-sm flex justify-center sticky top-0 z-50">
      <div>{title ? <span>{title}</span> : null}</div>
    </div>
  );
};

export default Header;
