import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Link from "next/link";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex flex-col items-center flex-1 w-full h-screen gap-20">
      <nav className="flex justify-center w-full h-16 border-b border-border">
        <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm">
          <Image
            src={Logo}
            width={32}
            height={32}
            alt="ThunderBox"
          />
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="flex flex-col flex-1 max-w-4xl gap-20 px-3 opacity-0 animate-in">
        <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
          Scripting Layer for <span className="font-bold"><br />no-code tools</span>
        </p>
        <Link href={'/projects'} className="mx-auto text-green-700 underline">Go to app</Link>
      </div>

      <footer className="flex justify-center w-full p-8 text-xs text-center border-t border-t-foreground/10">
        <p>
          Created by{" "}
          <a
            href="https://thethunderclap.com"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            ThunderClap
          </a>
        </p>
      </footer>
    </div>
  );
}
