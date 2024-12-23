'use client';

import { usePrivy } from "@privy-io/react-auth";

export default function LoginButton() {
  const { ready, authenticated, login } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);

  return (
    <button 
      disabled={disableLogin} 
      onClick={login}
      className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
    >
      Log in
    </button>
  );
} 