import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-[#F9F8F6] antialiased overflow-x-hidden selection:bg-amber-200 selection:text-slate-900">
                {/* Global Golden Glow Cursor */}
                <CustomCursor />
                
                <Header />
                {children}
            </body>
        </html>
    );
}