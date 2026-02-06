"use client"

import DialogRegisterLink from "@/components/DialogRegisterLink";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useConnection } from "wagmi";

export default function MyLinksPage() {
  const connection = useConnection();
  const router = useRouter();

  useEffect(() => {
    if (connection.status === 'disconnected') {
      router.push('/')
    }
  }, [connection.status, router])

  return (
    <div className="flex flex-col items-center justify-center gap-7 h-screen">
      <h1 className="text-white italic font-sherika text-3xl text-center">You haven’t registered any links yet. <br /> Start building your identity by saving what matters. <br /> Your reputation grows as others engage.</h1>
      <DialogRegisterLink />
    </div>
  )
}