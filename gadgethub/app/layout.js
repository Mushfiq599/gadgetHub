import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "GadgetHub — Discover Premium Tech",
  description: "Curated tech gadgets: earbuds, smartwatches, keyboards, gaming gear, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1e293b",
                color: "#f1f5f9",
                border: "1px solid #334155",
              },
              success: {
                iconTheme: { primary: "#22c55e", secondary: "#1e293b" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#1e293b" },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}