"use client";

import { ArrowLeft } from "lucide-react";
import { SearchBar } from "./searchBar";

interface props {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileSearchBar({isOpen, onClose}: props) {
if (!isOpen) return;
  return (
    <header className="px-2 md:px-0 sticky top-0 z-50 bg-background-light/80 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onClose()}
          >
            <ArrowLeft className="w-6 h-6 text-blue-400" />
          </div>

          <div>
            <SearchBar />
          </div>

          <div className="w-6" />
        </div>
      </div>
    </header>
  );
}
