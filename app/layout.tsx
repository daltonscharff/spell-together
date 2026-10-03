"use client";

import { useState, type ReactNode } from "react";
import "./globals.css";
import { TitleBar } from "./_components/TitleBar";
import { SelectedPuzzleIdContext } from "./_contexts/selectedPuzzleIdContext";

const appName = process.env.NEXT_PUBLIC_APP_NAME!;

export default function RootLayout({ children }: { children: ReactNode }) {
  const [selectedPuzzleId, setSelectedPuzzleId] = useState<number | null>(null);

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col p-3">
        <SelectedPuzzleIdContext
          value={{
            selectedPuzzleId,
            setSelectedPuzzleId,
          }}
        >
          <TitleBar title={appName} />
          {children}
        </SelectedPuzzleIdContext>
      </body>
    </html>
  );
}
