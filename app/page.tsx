"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useLogout, usePrivy } from "@privy-io/react-auth";
import { useSolanaWallets } from "@privy-io/react-auth/solana";

export default function Home() {
  const { ready, authenticated, login, user } = usePrivy();
  const { createWallet } = useSolanaWallets();
  const { logout } = useLogout();
  console.log(user);
  async function createSOLWallet() {
    const wallet = await createWallet();
    console.log("wallet", wallet);
  }
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);
  if (ready && authenticated) {
    if (!user?.wallet) createSOLWallet();
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <button
        disabled={disableLogin}
        onClick={async () => {
          console.log("login");
          login();
        }}
      >
        Log in
      </button>
      <button onClick={async () => await logout()}>Logout</button>
      {user && ( // Show user information when the user is authenticated
        <div>
          <p>NAME: {user.twitter?.name}</p>
          <p>USERNAME : {user.twitter?.username}</p>
          <p>WALLET ADDRESS : {user.wallet?.address}</p>
          <p>CHAIN : {user.wallet?.chainType}</p>
        </div>
      )}
    </section>
  );
}
