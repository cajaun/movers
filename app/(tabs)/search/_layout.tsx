import { Stack, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

const SearchLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          title: "",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "systemChromeMaterial",
          headerLargeTitleShadowVisible: false,

          headerLargeStyle: {
            backgroundColor: "transparent",
          },
          headerSearchBarOptions: {
            placeholder: "Shows, Movies and More",
          },
        }}
      />
    </Stack>
  );
};

export default SearchLayout;
