export interface IUser {
  customerId: string;
  user: {
    userId: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    createdAt: string;
  };
}
export interface IMessage {
  messageId: string;
  senderId: string;
  receiverId: string;
  message: string;
  status: string;
  readAt: string;
  createdAt: string;
}
