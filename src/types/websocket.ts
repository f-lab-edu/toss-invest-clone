export const WS_URL = "wss://stream.data.alpaca.markets/v2/delayed_sip";

export type RealtimeRow = {
  symbol: string;
  last?: number;
  size?: number;
  ts?: string;
};

export type SocketMsgRow = {
  S: string;
  T: string;
  c: Array<string>;
  i: number;
  p: number;
  s: number;
  t: string;
};
