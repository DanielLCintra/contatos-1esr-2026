import { ContactsProvider } from "./contexts/ContactsContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <ContactsProvider>
          {children}
        </ContactsProvider>
      </body>
    </html>
  );
}
