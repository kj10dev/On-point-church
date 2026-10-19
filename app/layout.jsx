import "./globals.css";

export const metadata = {
  title: "On-Point Church | You Belong Here",
  description: "A place to encounter God, a family to belong to, a purpose to live for. Sundays 9am & 11am.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
