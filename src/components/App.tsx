import type { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useCurrentGame } from "../hooks";
import type { Game } from "../lib/game-param";
import AlertBanner from "./AlertBanner";
import Footer from "./Footer";
import Header from "./Header";
import Instructions from "./Instructions";
import SplitMaker from "./SplitMaker";

export default function App(): ReactElement {
  const currentGame = useCurrentGame();
  let selectedIndex = 0;
  if (currentGame === "silksong") {
    selectedIndex = 1;
  }

  const [searchParams, setSearchParams] = useSearchParams();

  const switchGame = (game: Game): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("game", game);
    newParams.delete("builtin");
    newParams.delete("config");
    setSearchParams(newParams, { replace: true });
  };

  const onTabSelect = (index: number): void => {
    if (index === 0) {
      switchGame("hollowknight");
    }
    if (index === 1) {
      switchGame("silksong");
    }
  };

  return (
    <div id="app">
      <AlertBanner />
      <Header />
      <Tabs
        focusTabOnClick={false}
        onSelect={onTabSelect}
        selectedIndex={selectedIndex}
      >
        <TabList>
          <Tab>Hollow Knight</Tab>
          <Tab>Silksong</Tab>
        </TabList>
        <TabPanel>
          <Instructions />
          <SplitMaker />
          <Footer />
        </TabPanel>
        <TabPanel>
          <Instructions />
          <SplitMaker />
          <Footer />
        </TabPanel>
      </Tabs>
    </div>
  );
}
