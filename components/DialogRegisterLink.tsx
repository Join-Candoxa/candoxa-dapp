"use client"

import { FormEvent, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function DialogRegisterLink() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    description: ""
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="relative z-10 py-6 px-8 rounded-xl border border-white/20 bg-lavender-blue/80 backdrop-blur-xl text-blue-primary text-base cursor-pointer shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.05] hover:underline overflow-hidden font-semibold">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          Register Link
        </Button>
      </DialogTrigger>

      <DialogContent className="fixed! z-100! border border-white/20 bg-lavender-blue/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 sm:max-w-125 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none -z-10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <DialogHeader className="relative z-10">
          <DialogTitle className="text-blue-primary font-sherika font-bold text-2xl flex items-center gap-2">
            <ExternalLink className="w-6 h-6" />
            Register New Link
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
          <div className="flex flex-col gap-2">
            <label className="text-dark-blue font-semibold text-sm">URL</label>
            <Input
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={(event) => setFormData({ ...formData, url: event.target.value })}
              className="border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-blue-primary placeholder:text-dark-blue/50 focus:ring-2 focus:ring-blue-primary/50 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-dark-blue font-semibold text-sm">Title</label>
            <Input
              type="text"
              placeholder="Enter link title"
              value={formData.title}
              onChange={(event) => setFormData({ ...formData, title: event.target.value })}
              className="border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-blue-primary placeholder:text-dark-blue/50 focus:ring-2 focus:ring-blue-primary/50 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-dark-blue font-semibold text-sm">Description</label>
            <Textarea
              placeholder="Enter link description"
              value={formData.description}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
              className="border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-blue-primary placeholder:text-dark-blue/50 focus:ring-2 focus:ring-blue-primary/50 focus:border-transparent transition-all min-h-25 resize-none"
              required
            />
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="relative z-10 flex-1 py-3 px-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-dark-blue cursor-pointer shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] hover:underline overflow-hidden font-semibold"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
              Cancel
            </Button>

            <Button
              type="submit"
              className="relative z-10 flex-1 py-3 px-6 rounded-xl border border-white/20 bg-lavender-blue/80 backdrop-blur-xl text-blue-primary cursor-pointer shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] hover:underline overflow-hidden font-semibold"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              Register
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}