import { View, Text, ScrollView } from "react-native";
import React from "react";
import * as AC from "@bacons/apple-colors";

 const SearchSkeletonItems = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        overflow: "hidden",
        padding: 8,
        marginHorizontal: 8,
      }}
    >
      {/* Poster Image */}
      <View
        style={{
          width: 70, 
          height: 70,
          backgroundColor: AC.systemGray5,
          borderRadius: 8,
          overflow: "hidden",
        }}
      ></View>

      {/* Text Content */}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View
          className="h-2 w-[85%]  rounded-md"
          style={{ backgroundColor: AC.systemGray5, marginBottom: 8 }}
        />

        <View
          className="h-2 w-[85%]  rounded-md "
          style={{ backgroundColor: AC.systemGray5, marginBottom: 8  }}
        />

        <View
          className="h-2 w-[85%]  rounded-md"
          style={{ backgroundColor: AC.systemGray5, marginBottom: 8 }}
        />
      </View>
    </View>
  );
};



export const SearchSkeleton= () => {
  return (
<View>
      {[...Array(6)].map((_, i) => (
        <React.Fragment key={i}>
          <SearchSkeletonItems />
          {i !== 5 && ( 
            <View
              style={{
                height: 0.5,
                backgroundColor: AC.systemGray5,
                marginHorizontal: 16,
                marginVertical: 6,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </View>

  )
}
