import { type DateRange } from "react-day-picker";
import { atom, useAtom } from "jotai";

type Config = {
  value: string;
  filters?: {
    subject?: string;
    from?: string;
    to?: string;
    dateRange?: DateRange;
  };
  highlight: string;
};

const configAtom = atom<Config>({
  value: "",
  highlight: "",
});

export function useSearchValue() {
  return useAtom(configAtom);
}
