"use client";
import { Link } from "@chakra-ui/next-js";
import React from "react";
import AuthForm from "./AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { Button, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const isMypage = pathname === "/mypage";

  return (
    <header className="flex h-16 w-full items-center justify-between px-4 my-4">
      <div className="flex items-center">
        <Link className="text-2xl font-bold" href="/">
          Nomi Spot
        </Link>
      </div>
      {/* <nav className="flex-1 flex items-center justify-center gap-10 ml-16">
        <Link href="/" className="hover:underline hover:underline-offset-4">
          Home
          </Link>
          <Link
          href="/stores"
          className="hover:underline hover:underline-offset-4"
          >
          Stores
          </Link>
          <Link
          href="/about"
          className="hover:underline hover:underline-offset-4"
          >
          About
          </Link>
          <Link
          href="/contact"
          className="hover:underline hover:underline-offset-4"
          >
          Contact
          </Link>
      </nav> */}
      <div className="flex items-center gap-4">
        {user && !isMypage && (
          <Link
            href="/mypage"
            className="hover:underline hover:underline-offset-4"
          >
            <Button colorScheme="blue" minW="120px">
              マイページ
            </Button>
          </Link>
        )}
        <AuthForm />
      </div>
    </header>
  );
}
