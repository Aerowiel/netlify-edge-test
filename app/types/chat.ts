interface ChatMessage {
  type: string;
  timestamp: string;
  pseudo: string;
  message?: string;
}

export type { ChatMessage };
