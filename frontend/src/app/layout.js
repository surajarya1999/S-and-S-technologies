import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // 1. Footer import kiya
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-[#F9F8F6] antialiased overflow-x-hidden selection:bg-amber-200 selection:text-slate-900 flex flex-col min-h-screen">
                {/* Global Golden Glow Cursor */}
                <CustomCursor />

                <Header />

                {/* Main content area */}
                <main className="flex-grow">
                    {children}
                </main>

                {/* 2. Saare pages ke niche Footer aayega */}
                <Footer />
            </body>
        </html>
    );
}