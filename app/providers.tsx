"use client";

import type { ThemeProviderProps } from "next-themes";
import { PrivyProvider } from "@privy-io/react-auth";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
const solanaConnectors = toSolanaWalletConnectors();

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <PrivyProvider
      appId="cm50320pp03aj5mhzjd39agc3"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          walletChainType: "solana-only",
          theme: "light",
          accentColor: "#676FFF",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "off",
        },
        solanaClusters: [
          { name: "devnet", rpcUrl: "https://api.devnet.solana.com" },
        ],
      }}
    >
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </PrivyProvider>
  );
}
