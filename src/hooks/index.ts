import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { Game } from "../lib/game-param";
import { DEFAULT_GAME, parseGameParam } from "../lib/game-param";
import type { SplitsFunctions } from "../lib/splits";
import { splitsFunctions } from "../lib/splits";

export function useCurrentGame(): Game {
  const [searchParams] = useSearchParams();
  return parseGameParam(searchParams.get("game")) ?? DEFAULT_GAME;
}

export function useSplitsFunctions(): SplitsFunctions {
  const game = useCurrentGame();
  return useMemo(() => splitsFunctions(game), [game]);
}
