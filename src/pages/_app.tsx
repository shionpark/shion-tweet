import type { AppProps } from "next/app";

import "@/styles/globals.css";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        refreshInterval: 3000,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
