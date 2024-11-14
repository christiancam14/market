export interface Contact {
  name: string;
  username?: string;
  avatarUrl: string;
  message: string;
  messages?: Message[]; 
  chat: ChatMessage[];
  id: string;
}

export interface ChatMessage {
  sender: 'incoming' | 'outgoing'; // Indica si el mensaje es de un usuario entrante o saliente
  content: string; // El contenido del mensaje
  avatarUrl: string; // URL del avatar del usuario
}

export interface Message {
  senderId: string;
  content: string;
  timestamp: string;  // Puede incluir otros campos como fecha de envío, etc.
  chatId: string;
}