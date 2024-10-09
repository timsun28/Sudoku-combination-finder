import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Killer Sudoku Solver";
const APP_DEFAULT_TITLE = "Killer Sudoku Solver";
const APP_TITLE_TEMPLATE = "%s - Killer Sudoku Solver";
const APP_DESCRIPTION = "A tool to help solve a Killer Sudoku by finding combinations";

export const metadata: Metadata = {
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    applicationName: APP_NAME,
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

export const viewport: Viewport = {
    themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen max-w-screen-md mx-auto`}>{children}</body>
        </html>
    );
}
