"use client"

import CardLink from "@/components/CardLink";
import DialogRegisterLink from "@/components/DialogRegisterLink";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { getAllLinks, getCurrentAccount, initWeb3, type Link } from "@/lib/web3/contract";
import { Loader2 } from "lucide-react";

export default function FeedPage() {
  const router = useRouter();
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = useCallback(async () => {
    try {
      // Inicializa o web3
      initWeb3();

      // Verifica se há uma carteira conectada
      const account = await getCurrentAccount();

      if (!account) {
        router.push('/');
        return;
      }

      // Busca todos os links do contrato
      const allLinks = await getAllLinks();
      setLinks(allLinks);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchLinks();

    // Listener para detectar mudanças na carteira
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // Carteira desconectada
          router.push('/');
        } else {
          // Conta mudou, recarrega os links
          fetchLinks();
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Cleanup
      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [fetchLinks, router]);

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
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-primary animate-spin" />
          <p className="text-white text-lg">Loading links from blockchain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="flex flex-col items-center gap-8 scroll-smooth w-4xl mx-auto pt-10">
        <div className="flex items-center justify-between gap-4 w-full">
          <h1 className="text-white italic font-sherika text-xl">
            Identity isn&apos;t a profile, it&apos;s the collection of links associated with you, and reputation is the public proof that they matter.
          </h1>
          <DialogRegisterLink onLinkAdded={fetchLinks} />
        </div>
        {links.length === 0 ? (
          <div className="text-white text-center py-10">
            <p className="text-lg">No links found yet. Be the first to register a link!</p>
          </div>
        ) : (
          links.map((link, index) => (
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
          ))
        )}
      </div>
    </div>
  );
}
