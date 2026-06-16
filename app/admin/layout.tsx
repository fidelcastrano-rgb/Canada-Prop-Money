import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Canadian Prop Money Ltd.",
  description: "Secure administrative controls and logistics central monitoring console.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
