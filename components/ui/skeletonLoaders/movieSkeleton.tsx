import {  View } from "react-native";



export const MovieSkeleton = () => (
  <View>
  {/* Hero Section */}
  <View className="h-72 bg-[rgba(120,120,128,0.12)]" />

  {/* Overview Section */}
  <View className="p-4 gap-2">
    <View className="h-4 w-[90%] bg-[rgba(120,120,128,0.12)] rounded-md" />
    <View className="h-4 w-[80%] bg-[rgba(120,120,128,0.12)] rounded-md" />
    <View className="h-4 w-[85%] bg-[rgba(120,120,128,0.12)] rounded-md" />
  </View>

  {/* About Section */}
  <View className="p-4">
    <View className="h-6 w-20 bg-[rgba(120,120,128,0.12)] rounded-md mb-3" />
    <View className="bg-[rgba(120,120,128,0.12)] rounded-lg gap-px">
      {[...Array(8)].map((_, i) => (
        <View
          key={i}
          className="p-3 flex-row justify-between bg-[rgba(120,120,128,0.08)]"
        >
          <View className="h-4 w-24 bg-[rgba(120,120,128,0.12)] rounded-md" />
          <View className="h-4 w-36 bg-[rgba(120,120,128,0.12)] rounded-md" />
        </View>
      ))}
    </View>
  </View>
</View>
);

