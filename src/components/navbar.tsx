import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="text-gray-900 bg-white w-16 py-6 flex flex-col justify-between h-full fixed shadow-xl">
      <div className="space-y-6">
        <Link
          className="flex flex-col items-center mb-10 hover:translate-y-[-2px] transition-transform duration-300 ease-in-out"
          href={"/"}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </Link>
        <Link
          className="flex flex-col items-center hover:translate-y-[-2px] transition-transform duration-300 ease-in-out"
          href="/tweets/post"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </Link>
        <Link
          className="flex flex-col items-center hover:translate-y-[-2px] transition-transform duration-300 ease-in-out"
          href="/search"
        >
          <svg
            aria-hidden="true"
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </Link>
        <Link
          className="flex flex-col items-center hover:translate-y-[-2px] transition-transform duration-300 ease-in-out"
          href="/likes"
        >
          <svg
            aria-hidden="true"
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </Link>
      </div>
      <div>
        <Link
          className="flex flex-col items-center hover:translate-y-[-2px] transition-transform duration-300 ease-in-out"
          href="/profile"
        >
          <div className="PROFILE w-12 h-12 shadow-sm border border-gray-200 bg-slate-500 rounded-full hover:animate-spin flex justify-center items-center text-sm">
            name
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
