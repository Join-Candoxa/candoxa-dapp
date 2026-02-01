import Image from "next/image";
import CandoxaHorizontalLogo from '@/public/logos/Candoxa_Horizontal_Logo.png'

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src={CandoxaHorizontalLogo}
        alt="Candoxa Logo"
      />
    </div>
  );
}
