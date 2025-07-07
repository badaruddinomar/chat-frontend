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
  const { user } = useAppSelector((state) => state.userReducer);

  const {
    data: users,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useGetUsersQuery(undefined);

  const {
    data: fetchedMessages,
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(selectedUser);

  const [sendMessageMutation] = useSendMessagesMutation();

  useEffect(() => {
    if (fetchedMessages) {
      dispatch(setMessages(fetchedMessages?.data));
    }
  }, [fetchedMessages, dispatch]);

  useEffect(() => {
    if (!socket || !socket.connected) return;
    const handleNewMessage = (newMessage: IMessage) => {
      console.log("NEW MESSAGE:", newMessage);
      //  Admin/Support side: must have selectedUser
      if (selectedUser?.user?.userId) {
        const selectedId = Number(selectedUser.user.userId);

        if (
          Number(newMessage?.senderId) === selectedId ||
          Number(newMessage?.receiverId) === selectedId
        ) {
          dispatch(addMessage(newMessage));
        }
      } else {
        // Customer side: no selectedUser, just check if message is for me
        const myId = Number(user?.user?.userId);

        if (
          Number(newMessage?.receiverId) === myId ||
          Number(newMessage?.senderId) === myId
        ) {
          dispatch(addMessage(newMessage));
        }
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [selectedUser, dispatch, user]);

  useEffect(() => {
    if (selectedUser) {
      refetchMessages();
    }
  }, [selectedUser, dispatch, refetchMessages]);

  useEffect(() => {
    const handleOnlineUsers = (userIds: string[]) => {
      setOnlineUserIds(userIds);
    };
    socket.on("onlineUsers", handleOnlineUsers);
    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, []);

  const sendMessage = async (formData: { message: string }) => {
    try {
      const res = await sendMessageMutation(formData).unwrap();
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
