import { cls } from "@/lib/utils";

import Header from "./header";
import Navbar from "./navbar";

interface LayoutProps {
  canGoBack?: boolean;
  children: React.ReactNode;
  hasTabBar?: boolean;
  title?: string;
}

const Layout = ({ canGoBack, children, hasTabBar, title }: LayoutProps) => {
  return (
    <div className="flex bg-orange-100 border border-gray-100 rounded-sm">
      {hasTabBar ? <Navbar /> : null}
      <div className="flex flex-col pl-16 w-full">
        <Header canGoBack={canGoBack} title={title} />
        <div className={cls(hasTabBar ? "pt-6" : "")}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
