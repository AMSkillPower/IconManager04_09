"use client";
import { useState } from "react";
import { UploadDialog } from "./components/upload-dialog";
import { SearchBar } from "./components/search-bar";
import { ImageGrid } from "./components/image-grid";
import {
  Upload,
  Search,
  Image as ImageIcon,
  Sparkles,
  Grid,
  Bookmark,
} from "lucide-react";
import NextImage from "next/image";

type TabType = "icons" | "banners";

export default function Home() {
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("icons");
  const [titleSearch, setTitleSearch] = useState("");

  const handleUploadComplete = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const tabs = [
    { id: "icons", label: "Icone", icon: Grid },
    { id: "banners", label: "Banner", icon: Bookmark },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 overflow-hidden">
      {/* Header con titolo centrato */}
      <header className="glass border-b border-blue-100/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Spazio sinistro per bilanciare */}
            <div className="w-32"></div>

            {/* Logo e titolo centrati */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <NextImage
                  src="/SkillPower.svg"
                  alt="SkillPower"
                  width={32}
                  height={32}
                  className="h-8 w-8 text-white"
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
                  SkillPower Gallery
                </h1>
                <p className="text-sm text-slate-500 hidden sm:block">
                  Gestione intelligente delle immagini
                </p>
              </div>
            </div>

            {/* Upload button a destra */}
            <div className="w-32 flex justify-end">
              <UploadDialog onUploadComplete={handleUploadComplete} />
            </div>
          </div>
        </div>
      </header>

      {/* Layout principale fullscreen */}
      <div className="h-[calc(100vh-80px)] flex flex-col lg:flex-row">
        {/* Sidebar sinistra - Search */}
        <div className="lg:w-80 xl:w-96 bg-white/60 backdrop-blur-sm border-r border-blue-100/50 flex flex-col">
          <div className="p-6 border-b border-blue-100/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Search className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Ricerca
                </h2>
                <p className="text-sm text-slate-500">Filtra contenuti</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <SearchBar onSearch={setSearchTags} searchTags={searchTags} />
          </div>
        </div>

        {/* Area principale - Tab e Griglia immagini */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-white/80 to-blue-50/40">
          {/* Header con tab */}
          <div className="border-b border-blue-100/50 bg-white/40 backdrop-blur-sm">
            <div className="p-6 pb-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                    <ImageIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      {searchTags.length > 0 || titleSearch
                        ? "Risultati"
                        : tabs.find((t) => t.id === activeTab)?.label}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {searchTags.length > 0 || titleSearch
                        ? `Filtri attivi: ${[
                            ...searchTags,
                            titleSearch ? "titolo" : "",
                          ]
                            .filter(Boolean)
                            .join(", ")}`
                        : `Tutte le ${
                            activeTab === "icons" ? "icone" : "banner"
                          }`}
                    </p>
                  </div>
                </div>

                {(searchTags.length > 0 || titleSearch) && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-soft"></div>
                    <span className="text-sm font-medium text-blue-700">
                      Filtrato
                    </span>
                  </div>
                )}
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-white/60 p-1 rounded-xl border border-blue-100/50">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RICERCA PER TITOLO CENTRALE */}

          <div className="flex flex-col items-center justify-center gap-3 p-4">
            <div className="flex">
              <input
              type="text"
              value={titleSearch}
              onChange={(e) => setTitleSearch(e.target.value)}
              placeholder="🔍Cerca per titolo..."
              className="w-full sm:w-80 md:w-96 px-3 py-2 border border-blue-200/50 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
            </div>
            
          </div>

          <div className="flex-1 overflow-hidden">
            <ImageGrid
              searchTags={searchTags}
              refreshTrigger={refreshTrigger}
              activeTab={activeTab}
              titleSearch={titleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
