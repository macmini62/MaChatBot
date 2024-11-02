import type { Metadata } from "next";
import "./globals.css";
import Notification from "./components/notification/notification";

export const metadata: Metadata = {
  title: "MaChatBot",
  description: "Mac finally creates a ChatBot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        {children}
        {/* <Notification
          type="success"
          placement="bottomLeft"
          message="Logged In sucessfully."
        /> */}
      </body>
    </html>
  );
}
