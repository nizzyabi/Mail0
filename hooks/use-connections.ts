import { IConnection } from "@/types";
import axios from "axios";
import useSWR from "swr";

export const useConnections = () => {
  // override the fetcher
  const { data, error, isLoading, mutate } = useSWR<{ data: { connections: IConnection[] } }>(
    "/api/v1/mail/connections",
    axios,
  );

  return {
    data: data?.data.connections,
    error,
    isLoading,
    mutate,
  };
};
