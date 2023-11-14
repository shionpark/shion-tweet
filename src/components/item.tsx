import Link from "next/link";

interface ItemProps {
  comments: number;
  createdAt: Date;
  hearts: number;
  id: number;
  text: string;
  title: string;
  email: string;
  username: string;
}

export default function Item({
  comments,
  createdAt,
  hearts,
  id,
  text,
  title,
  email,
  username,
}: ItemProps) {
  return (
    <div className="ONE_ROW flex">
      <div className="L_COL_PROFILE mt-6">
        <div className="PROFILE w-12 h-12 shadow-sm border border-gray-200 bg-slate-500 rounded-full"></div>
      </div>
      <div className="R_COL flex flex-col ml-4 space-y-1">
        <div className="T_INFO flex text-sm space-x-1 pl-2">
          <h2 className="font-bold font-gray-900">{username}</h2>
          <span className="text-gray-500">@{email.split("@")[0]}</span>
          <p>·</p>
          <span className="text-gray-500">
            {createdAt.toLocaleString().split("T")[0]}
          </span>
        </div>
        <Link
          className="T_TEXT rounded-xl bg-blue-500 text-white shadow-sm cursor-pointer hover:translate-y-[-4px] transition-transform duration-300 ease-in-out"
          href={`/tweets/${id}`}
        >
          <div className="my-2 px-4">
            <p className="text font-bold font-gray-900">{title}</p>
            <br />
            <p className="text font-gray-900">{text}</p>
          </div>
        </Link>
        <div className="ICONS pr-2 flex justify-end items-end space-x-2">
          <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <span>{hearts}</span>
          </div>
          <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
            <svg
              className="w-4 h-4"
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
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
