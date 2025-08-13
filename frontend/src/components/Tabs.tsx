import type { Tabs } from "../types";

interface TabsProps {
  selectedTab: string | undefined;
  onTabChange: (tab: Tabs) => void;
}

export default function Tabs({ selectedTab, onTabChange }: TabsProps) {
  return (
    <div className="tabs flex gap-8 cursor-pointer text-2xl">
      <h1
        className={selectedTab === "search" ? "font-bold" : ""}
        onClick={() => onTabChange("search")}
      >
        Recipe Search
      </h1>
      <h1
        className={selectedTab === "favourites" ? "font-bold" : ""}
        onClick={() => onTabChange("favourites")}
      >
        Favourites
      </h1>
    </div>
  );
}
