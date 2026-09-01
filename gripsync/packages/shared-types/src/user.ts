export interface User {
  id: string;
  username: string;
  handSize: {
    length: number;
    width: number;
  };
  preferredLanguage: string;
  preferredCurrency: string;
  createdAt: Date;
}

export interface UserSetup {
  userId: string;
  currentMouse?: string;
  currentMousepad?: string;
  currentKeyboard?: string;
  currentMonitor?: string;
  deskWidth?: number;
  deskDepth?: number;
}
