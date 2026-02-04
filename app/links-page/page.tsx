"use client"

import { useConnection } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LinksPage() {
  const connection = useConnection()
  const router = useRouter()

  useEffect(() => {
    if (connection.status === 'disconnected') {
      router.push('/')
    }
  }, [connection.status, router])

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-white"> List of links shared by users.</h1>
    </div>
  );
}
