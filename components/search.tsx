"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

export function Search() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-10 p-0 md:w-32 md:justify-start md:px-3">
          <SearchIcon className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline-flex">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="top-24">
        <div className="flex items-center space-x-2">
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search auctions..."
            className="flex-1"
            autoFocus
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}