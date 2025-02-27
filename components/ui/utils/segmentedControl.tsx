import React, { useEffect, useRef, useState } from 'react';
import { 
    View, Text, TouchableOpacity, StyleSheet, Animated, 
    Dimensions 
} from 'react-native';
import * as AC from "@bacons/apple-colors";

interface Props {
    values: string[];
    selectedIndex: number;
    onChange: (index: number) => void;
}

export const SegmentedControl = ({ values, selectedIndex, onChange }: Props) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const screenWidth = Dimensions.get('window').width;
    const [segmentWidths, setSegmentWidths] = useState<number[]>([]);
    const [containerWidth, setContainerWidth] = useState(screenWidth - 32); 


    useEffect(() => {
        const measuredWidths = values.map(value => value.length * 10 + 32); 
        setSegmentWidths(measuredWidths);
        setContainerWidth(measuredWidths.reduce((a, b) => a + b, 0));
    }, [values]);


    useEffect(() => {
        if (segmentWidths.length > 0) {
            Animated.spring(translateX, {
                toValue: segmentWidths.slice(0, selectedIndex).reduce((a, b) => a + b, 0),
                useNativeDriver: true,
            }).start();
        }
    }, [selectedIndex, segmentWidths]);

    return (
        <View 
            style={[styles.container, { width: containerWidth }]}
        >
            {segmentWidths.length > 0 && (
                <Animated.View
                    style={[
                        styles.highlight,
                        {
                            width: segmentWidths[selectedIndex],
                            transform: [{ translateX }],
                        },
                    ]}
                />
            )}
            {values.map((value, index) => (
                <TouchableOpacity
                    key={value}
                    onPress={() => onChange(index)}
                    style={[styles.segment, { width: segmentWidths[index] }]}
                >
                    <Text style={[
                        styles.text,
                        { color: selectedIndex === index ? 'white' : 'black' }
                    ]}>
                        {value}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#222', // Dark background
        padding: 2, // Ensures padding inside the pill
    },
    highlight: {
        position: 'absolute',
        height: 36,
        backgroundColor: AC.systemPurple, // Purple pill color
        borderRadius: 18,
        zIndex: 1,
    },
    segment: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        paddingHorizontal: 16, // Adds padding inside each segment
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
});

