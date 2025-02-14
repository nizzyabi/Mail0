export interface Connection {
  id: string;
  email: string;
  name: string;
  picture: string | null;
  createdAt: Date;
}

export async function checkConnections(): Promise<Connection[]> {
  const response = await fetch("/api/v1/mail/connections");

  if (!response.ok) {
    throw new Error(`Failed to fetch connections: ${response.statusText}`);
  }

  const data = await response.json();
  return data.connections;
}
