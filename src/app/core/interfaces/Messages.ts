export interface Contact {
  name: string;
  avatarUrl: string;
  message: string;
  chat: ChatMessage[];
  id: string;
}

export interface ChatMessage {
  sender: 'incoming' | 'outgoing'; // Indica si el mensaje es de un usuario entrante o saliente
  content: string; // El contenido del mensaje
  avatarUrl: string; // URL del avatar del usuario
}
