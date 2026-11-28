import type { ReactNode } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { parseGameParam, withDefaultGameParam } from "../lib/game-param";

interface AppWrapperProps {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps): ReactNode {
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();
  const gameParam = parseGameParam(searchParams.get("game"));

  if (!gameParam) {
    // Missing or unknown game: redirect to the default game, keeping the
    // other params and the hash (used by legacy #category links).
    const search = `?${withDefaultGameParam(searchParams).toString()}`;
    return <Navigate replace={true} to={{ hash, search }} />;
  }

  return <>{children}</>;
}
