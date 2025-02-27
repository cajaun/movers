import { Stack,  useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";




const SearchLayout = () => {
  const router = useRouter();


  return (
    <Stack

    >
      <Stack.Screen
        name="index"
        
options={{
  headerShadowVisible: false,
        title: "Search",
        headerLargeTitle: true,
        headerTransparent: true,
        headerBlurEffect: "systemChromeMaterial",
        headerLargeTitleShadowVisible: false,

        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerSearchBarOptions: {
          placeholder: "Shows, Movies and More",
          onChangeText: (event) => {
            router.setParams({ query: event.nativeEvent.text });
          },
        },
    
}}
       
      />
    </Stack>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#000",
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#a259ff",
  },
  tabText: {
    color: "#fff",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "700",
  },
  content: {
    padding: 20,
  },
  contentText: {
    color: "#fff",
    fontSize: 16,
  },
});
export default SearchLayout;
