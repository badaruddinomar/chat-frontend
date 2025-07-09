import {
  setSelectedUser,
  addMessage,
  setMessages,
  removeMessage,
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
    if (!socket) return;
    const handleNewMessage = (newMessage: IMessage) => {
      const myId = Number(user?.user?.userId);
      if (!myId) return;

      if (
        Number(newMessage.senderId) === myId ||
        Number(newMessage.receiverId) === myId
      ) {
        dispatch(addMessage(newMessage));
        return;
      }
      if (
        selectedUser?.user?.userId &&
        (Number(newMessage.senderId) === Number(selectedUser.user.userId) ||
          Number(newMessage.receiverId) === Number(selectedUser.user.userId))
      ) {
        dispatch(addMessage(newMessage));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [dispatch, selectedUser?.user.userId, user?.user.userId]);

  useEffect(() => {
    if (selectedUser) {
      refetchMessages();
    }
  }, [selectedUser, dispatch, refetchMessages]);

  useEffect(() => {
    if (!socket) return;
    const handleMessageDeleted = ({ messageId }: { messageId: string }) => {
      console.log("Message deleted:", messageId);
      dispatch(removeMessage(Number(messageId)));
    };

    socket.on("messageDeleted", handleMessageDeleted);

    return () => {
      socket.off("messageDeleted", handleMessageDeleted);
    };
  }, [dispatch, refetchMessages]);

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
