"use client"

import CardLink from "@/components/CardLink";
import DialogRegisterLink from "@/components/DialogRegisterLink";
import { MOCK_LINKS } from "@/mocks/links";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useConnection } from "wagmi";

export default function FeedPage() {
  const connection = useConnection();
  const router = useRouter();

  useEffect(() => {
    if (connection.status === 'disconnected') {
      router.push('/')
    }
  }, [connection.status, router])

  return (
    <div className="h-screen overflow-y-auto pb-10">
      <div className="mt-40 flex flex-col items-center gap-8 scroll-smooth w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4 w-full">
          <h1 className="text-white italic font-sherika text-xl">
            Identity isn’t a profile, it’s the collection of links associated with you, and reputation is the public proof that they matter.
          </h1>
          <DialogRegisterLink />
        </div>
        {MOCK_LINKS.map((link, index) => (
          <CardLink
            key={index}
            wallet_address={`${connection.addresses && connection.addresses.length > 0 ? `${connection.addresses[0].slice(0, 6)}....${connection.addresses[0].slice(-4)}` : ""}`}
            link={link.link}
            title={link.title}
            description={link.description}
            published_date={link.published_date}
            love_counter={link.love_counter}
          />
        ))}
      </div>
    </div>
  );
}
