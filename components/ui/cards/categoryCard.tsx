import React, { useState } from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import { SymbolView, SFSymbol } from "expo-symbols";
import { FadeIn } from "../utils/fadeIn";
import { useBottomTabOverflow } from "../utils/tabBarBackground";
import { router } from "expo-router";
import * as Haptic from "expo-haptics";
import { ScrollView } from "react-native";
import { SegmentedControl } from "../utils/segmentedControl";
import TouchableBounce from "../utils/touchableBounce";
import { categories } from "@/utils/categoryData";



const categoryHandler = (itemId: string, itemName: string) => {
  Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
  router.push(`/(tabs)/search/category/${itemId}?name=${itemName}`);
};



const CategoryCard = () => {

  
  const paddingBottom = useBottomTabOverflow();

  return (
    <View style={{ paddingBottom: paddingBottom }}>



      <FadeIn>
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableBounce
              onPress={() => categoryHandler(item.id, item.name)}
              style={{width: "50%"}}
            >
              <View
                key={item.name}
                className={` rounded-lg justify-center pl-4 relative overflow-hidden`}
                style={{
                  marginBottom: 10,
                  marginHorizontal: 5,
                  flex: 1,
                  backgroundColor: item.bgColor,
                  height: 100,
                }}
              >
                <SymbolView
                  name={item.icon}
                  type="palette"
                  size={item.size}
                  style={{ position: "absolute", top: 16, right: 16 }}
                  colors={item.colors}
                />

                <Text
                  className="text-white text-lg font-bold"
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 12,
                    right: 0,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableBounce>
          )}
          contentContainerStyle={{ padding: 16, paddingBottom: paddingBottom }}
        />
      </FadeIn>
    </View>
  );
};

export default CategoryCard;
