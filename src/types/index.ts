export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: {
    url: string;
    public_id: string;
  };
  isVerified: boolean;
  createdAt: string;
}
export interface IMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image?: {
    url: string;
    public_id: string;
  };
}
