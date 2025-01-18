import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import Modal from "@/components/Modal";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster/>
    <RegisterModal />
   <LoginModal/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
