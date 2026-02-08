"use client"

import CardLink from "@/components/CardLink";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { getLinksByOwner, initWeb3, type Link as LinkType } from "@/lib/web3/contract";
import { Loader2, Link as LinkIcon, Activity, ArrowLeft } from "lucide-react";
import Image from "next/image";
import CandoxaLogo from '@/public/logos/Candoxa_Logo.svg';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const params = useParams();
  const walletId = params.wallet_id as string;

  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserLinks = useCallback(async () => {
    try {
      initWeb3();

      // Busca os links do usuário específico
      const userLinks = await getLinksByOwner(walletId);
      setLinks(userLinks);
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  }, [walletId]);

  useEffect(() => {
    fetchUserLinks();

    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = () => {
        fetchUserLinks();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [fetchUserLinks]);

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}....${address.slice(-4)}`;
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-primary animate-spin" />
          <p className="text-white text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="flex gap-8 px-8 max-w-400 mx-auto pt-10">
        {/* Sidebar */}
        <aside className="w-96 shrink-0">
          <div className="sticky top-30 border border-white/20 bg-lavender-blue/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-blue-500/10 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-8">
              {/* Back Button */}
              <Link href="/feed">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-blue-primary hover:text-dark-blue hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Feed
                </Button>
              </Link>

              {/* Profile Section */}
              <div className="flex flex-col items-center gap-4 pb-6 border-b border-white/20">
                <Image
                  src={CandoxaLogo}
                  alt="Profile"
                  width={80}
                  height={80}
                />
                <div className="text-center">
                  <h2 className="text-blue-primary font-bold text-xl mb-1">
                    {formatWalletAddress(walletId)}
                  </h2>
                  <p className="text-dark-blue text-sm">User Profile</p>
                </div>
              </div>

              {/* Doxa Points Section */}
              <div className="pb-6 border-b border-white/20">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="text-blue-primary w-5 h-5" />
                  <h3 className="text-blue-primary font-bold text-lg">Doxa Points</h3>
                </div>
                <div className="text-center">
                  <p className="text-6xl font-sherika text-blue-primary mb-2">20</p>
                  <p className="text-dark-blue text-sm">Community reputation score</p>
                </div>
              </div>

              {/* Stats Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <LinkIcon className="text-blue-primary w-5 h-5" />
                  <h3 className="text-blue-primary font-bold text-lg">Statistics</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-dark-blue">Total Links</span>
                    <span className="text-blue-primary font-bold text-xl">{links.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-dark-blue">Total Loves</span>
                    <span className="text-blue-primary font-bold text-xl">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-white italic font-sherika text-3xl mb-2">
              {formatWalletAddress(walletId)}&apos;s Links
            </h1>
            <p className="text-white text-lg">
              Explore the verified links and reputation of this user on the blockchain.
            </p>
          </div>

          {links.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-7 py-20">
              <div className="border border-white/20 bg-lavender-blue/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl shadow-blue-500/10 relative overflow-hidden max-w-2xl">
                <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 text-center">
                  <LinkIcon className="w-16 h-16 text-blue-primary mx-auto mb-6" />
                  <h2 className="text-white italic font-sherika text-2xl mb-4">
                    No links registered yet
                  </h2>
                  <p className="text-dark-blue text-lg">
                    This user hasn&apos;t registered any links on the blockchain yet.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {links.map((link, index) => (
                <CardLink
                  key={index}
                  wallet_address={formatWalletAddress(link.linkOwner)}
                  full_wallet_address={link.linkOwner}
                  link={link.link}
                  title={link.title}
                  description={link.description}
                  published_date={formatDate(link.publishedAt)}
                  love_counter={0}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
