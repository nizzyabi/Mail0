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
};

const configAtom = atom<Config>({
  value: "",
});

export function useSearchValue() {
  return useAtom(configAtom);
}
