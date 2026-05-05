import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&family=Fira+Mono:wght@400;500;700&family=Fira+Code:wght@400;500;600&family=Poppins:wght@400;500;600&family=Geist+Mono:wght@400;500;600;700&display=swap"
        />
        <script
          id="superflowToolbarScript"
          data-sf-platform="other-manual"
          async
          src="https://cdn.velt.dev/lib/superflow.js?apiKey=aU1MxKP0rca2UXwKi8bl&projectId=620866069199868"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
