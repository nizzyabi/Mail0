import { atom, useAtom } from "jotai";

type Config = {
  value: string;
  highlight: string;
};

const configAtom = atom<Config>({
  value: "",
  highlight: "",
});

export function useSearchValue() {
  return useAtom(configAtom);
}
