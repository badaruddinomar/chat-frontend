import {
  setSelectedUser,
  addMessage,
  setMessages,
} from "@/redux/reducer/chatReducer";
import { useEffect, useState } from "react";
import { IMessage, IUser } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUsersQuery } from "@/redux/apiClient/userApi";
import {
  useGetMessagesQuery,
  useSendMessagesMutation,
} from "@/redux/apiClient/messageApi";
import socket from "@/lib/socket";
export const useChat = () => {
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { selectedUser, messages } = useAppSelector(
    (state) => state.chatReducer
  );

  const {
    data: users,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useGetUsersQuery(undefined);

  const {
    data: fetchedMessages,
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(undefined);

  const [sendMessageMutation] = useSendMessagesMutation();

  useEffect(() => {
    if (fetchedMessages) {
      dispatch(setMessages(fetchedMessages?.data));
    }
  }, [fetchedMessages, dispatch]);

  useEffect(() => {
    if (!socket || !socket.connected) return;
    const handleNewMessage = (newMessage: IMessage) => {
      if (
        newMessage?.senderId === selectedUser?.id ||
        newMessage?.receiverId === selectedUser?.id
      ) {
        dispatch(addMessage(newMessage));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [selectedUser, dispatch]);
  useEffect(() => {
    const handleOnlineUsers = (userIds: string[]) => {
      setOnlineUserIds(userIds);
    };

    socket.on("getOnlineUsers", handleOnlineUsers);

    return () => {
      socket.off("getOnlineUsers", handleOnlineUsers);
    };
  }, []);

  const sendMessage = async (formData: { message: string; image?: File }) => {
    if (!selectedUser) return;
    try {
      const res = await sendMessageMutation({
        chatToId: selectedUser.id,
        formData,
      }).unwrap();
      dispatch(addMessage(res?.data));
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  return {
    users: users?.data,
    selectedUser,
    messages,
    isUsersLoading,
    isMessagesLoading,
    onlineUserIds,
    setSelectedUser: (user: IUser | null) => dispatch(setSelectedUser(user)),
    sendMessage,
    refetchMessages,
    refetchUsers,
  };
};
