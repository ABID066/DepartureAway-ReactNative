import { View } from "react-native";
import LiveChatHeader from "@/components/Shared/(Headers)/LiveChatHeader";
import LiveChatContent from "@/components/Discussions/LiveChatContent";

const LiveChatPage = () => {
  return (
    <View>
      <LiveChatHeader />
      <LiveChatContent/>
    </View>
  );
};

export default LiveChatPage;
