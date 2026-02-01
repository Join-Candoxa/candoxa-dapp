import Image from "next/image";
import { Button } from "./ui/button";
import CandoxaLogo from '@/public/logos/Candoxa_Logo.svg'
import MetaMask from '@/public/icons/MetaMask.svg'
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between p-6 bg-white fixed w-full z-20">
      <Link href="/">
        <Image
          src={CandoxaLogo}
          alt="Candoxa Logo"
          width={50}
          height={50}
        />
      </Link>
      <ul className="flex gap-8 text-lg font-medium text-dark-blue">
        <li className="hover:underline hover:text-blue-primary cursor-pointer">
          <Link href="/">
            Home
          </Link>
        </li>
        <li className="hover:underline hover:text-blue-primary cursor-pointer">
          <Link href="/links-page">
            Links Page
          </Link>
        </li>
      </ul>
      <Button
        className="flex items-center gap-4 p-6 bg-light-blue hover:bg-blue-primary hover:underline cursor-pointer rounded-xl text-white font-bold"
      >
        <Image
          src={MetaMask}
          alt="MetaMask Logo"
          width={30}
          height={30}
        />
        Connect with MetaMask
      </Button>
    </div>
  )
}
