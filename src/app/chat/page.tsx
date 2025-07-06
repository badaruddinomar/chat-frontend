"use client";
import { useAppSelector } from "@/redux/hooks";
import AdminChatInterface from "./_components/AdminChatInterface";
import CustomerChatInterface from "./_components/CustomerChatInterface";

export default function ChatPage() {
  const { user } = useAppSelector((state) => state.userReducer);
  const isAdmin =
    user?.user?.role === "ADMIN" ||
    user?.user?.role === "SUPPORT" ||
    user?.user?.role === "SUPER_ADMIN";
  return (
    <div className="h-screen flex bg-background">
      {isAdmin && <AdminChatInterface />}
      {user?.user?.role === "CUSTOMER" && <CustomerChatInterface />}
    </div>
  );
}
