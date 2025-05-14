import React, { useState } from "react";
import { StyleSheet, Text, TextStyle, View, StyleProp } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PressableScale } from "./pressableScale";
import { ViewStyle } from "react-native";

type TTab = {
  id: string;
  title: string;
};

type TpillTab = {
  tabs: TTab[];
  activeTab: string;
  onChangeTab: (id: string) => void;
  pillTabContainerStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  pillTabTextStyle?: StyleProp<TextStyle>;
};

type TTabLayout = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const initialTabLayout = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

type TCurrentTabLayout = Record<
  string,
  { width: number; height: number; x: number; y: number }
>;

const PillTabs = ({
  activeTab,
  tabs,
  onChangeTab,
  pillTabContainerStyle,
  indicatorStyle,
  pillTabTextStyle,
  tabStyle,
}: TpillTab) => {
  const activeTabLayout = useSharedValue<TTabLayout>(initialTabLayout);
  const [layouts, setLayouts] = useState<TCurrentTabLayout>({});

  const handleLayout = (id: string, event: any, index: number) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    if (id === activeTab || index === 0) {
      activeTabLayout.value = { width, height, x, y };
    }
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      [id]: { width, height, x, y },
    }));
  };

  const onHandlePress = (item: TTab) => {
    onChangeTab(item.id);
    activeTabLayout.value = withTiming(layouts[item.id], { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: activeTabLayout.value.height,
      top: activeTabLayout.value.y,
      width: activeTabLayout.value.width,
      left: activeTabLayout.value.x,
    };
  });

  return (
    <View>
      <Animated.View
        style={[animatedStyle, styles.baseIndicatorStyle, indicatorStyle]}
      />
      <View style={[styles.basepillTabContainerStyle, pillTabContainerStyle]}>
        {tabs.map((item, index) => (
          <PressableScale
            disabled={item.id === activeTab}
            key={item.id}
            onPress={() => onHandlePress(item)}
            onLayout={(event) => handleLayout(item.id, event, index)}
            style={tabStyle}
          >
            <Text style={pillTabTextStyle}>{item.title}</Text>
          </PressableScale>
        ))}
      </View>
    </View>
  );
};

export default PillTabs;

const styles = StyleSheet.create({
  basepillTabContainerStyle: {
    flexDirection: "row",
  },
  baseIndicatorStyle: {
    position: "absolute",
  },
});