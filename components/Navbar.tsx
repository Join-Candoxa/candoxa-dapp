"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import CandoxaLogo from '@/public/logos/Candoxa_Logo.svg'
import MetaMask from '@/public/icons/MetaMask.svg'
import Link from "next/link";
import { LogOut } from 'lucide-react'
import { injected, useConnect, useConnection, useDisconnect } from "wagmi";
import { toast } from "sonner";

export default function Navbar() {
  const connection = useConnection()
  const { connect } = useConnect({
    mutation: {
      onSuccess: () => {
        toast.success('Wallet Connected Successfully!')
      }
    }
  })
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {
        toast.info('Wallet Disconnected')
      }
    }
  })

  return (
    <div className="flex items-center justify-between p-6 bg-lavender-blue fixed w-full z-20 border-b-2 border-dark-blue">
      <Link href="/">
        <Image
          src={CandoxaLogo}
          alt="Candoxa Logo"
          width={50}
          height={50}
        />
      </Link>
      {connection.status === 'connected' &&
        <ul className="flex gap-8 text-lg font-medium text-dark-blue">
          <li className="hover:underline hover:text-blue-primary cursor-pointer">
            <Link href="/">
              Home
            </Link>
          </li>
          <li className="hover:underline hover:text-blue-primary cursor-pointer">
            <Link href="/feed">
              Feed
            </Link>
          </li>
        </ul>
      }
      <div className="flex items-center">
        {connection.addresses && connection.addresses.length > 0 ?
          <div className="flex items-center gap-4">
            <Link href="/profile" className="flex flex-col items-center hover:opacity-80 transition-opacity">
              <span className="font-bold text-xl text-blue-primary">{`${(connection.addresses[0]).slice(0, 6)}....${(connection.addresses[0]).slice(-4)}`}</span>
              <span className="font-sherika text-dark-blue hover:underline">Profile</span>
            </Link>
            <Button
              size="icon"
              onClick={() => disconnect()}
              className="p-6 cursor-pointer text-light-blue hover:text-white hover:bg-light-blue rounded-full"
            >
              <LogOut />
            </Button>
          </div>
          :
          <Button
            className="flex items-center gap-4 p-6 bg-light-blue hover:underline cursor-pointer rounded-full text-white font-bold hover:bg-blue-primary"
            onClick={() => { connect({ connector: injected() }) }}
          >
            <Image
              src={MetaMask}
              alt="MetaMask Logo"
              width={30}
              height={30}
            />
            Connect with MetaMask
          </Button>
        }
      </div>
    </div>
  )
}
