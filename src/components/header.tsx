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
      <div>
        {canGoBack ? (
          <button onClick={onClick}>
            <svg
              className="w-6 h-6"
              d="M15 19l-7-7 7-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </button>
        ) : null}
      </div>
      <div>{title ? <span>{title}</span> : null}</div>
    </div>
  );
};

export default Header;
