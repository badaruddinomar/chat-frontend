import { IMessage, IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  selectedUser: IUser | null;
  messages: IMessage[];
}

const initialState: ChatState = {
  selectedUser: null,
  messages: [],
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<IUser | null>) => {
      state.selectedUser = action.payload;
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      const exists = state.messages.some(
        (msg) => msg.messageId === action.payload.messageId
      );
      if (!exists) {
        state.messages.push(action.payload);
      }
    },
    removeMessage: (state, action) => {
      const id = Number(action.payload);
      state.messages = state.messages.filter(
        (msg) => Number(msg.messageId) !== id
      );
    },
    setMessages: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const {
  setSelectedUser,
  addMessage,
  setMessages,
  clearMessages,
  removeMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
