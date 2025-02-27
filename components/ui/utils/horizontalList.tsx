import { ScrollView, Text, View } from "react-native";
import { label } from "@bacons/apple-colors";

export const HorizontalList = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={{ marginBottom: 24 }} >
    <Text
      style={{
        fontSize: 20,
        fontWeight: "600",
        color: label,
        marginBottom: 12,
        paddingHorizontal: 16,
      }}
    >
      {title}
    </Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}
    >
      {children}
    </ScrollView>
  </View>
);
