import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | Canadian Prop Money",
  description: "Secure prop currency acquisition order placement pipeline.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
