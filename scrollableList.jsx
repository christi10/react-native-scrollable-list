import React, { useState, useCallback } from "react";
import { View, Text, Button, FlatList } from "react-native";

const ScrollableItems = () => {
  const [data, setData] = useState([
    { key: "1", value: "Item 1" },
    { key: "2", value: "Item 2" },
    { key: "3", value: "Item 3" },
    { key: "4", value: "Item 4" },
    { key: "5", value: "Item 5" },
    { key: "6", value: "Item 6" }
    // Add more items as needed
  ]);

  const itemsPerScroll = 2;

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerScroll);
  const [displayedItems, setDisplayedItems] = useState(
    data.slice(startIndex, endIndex)
  );
  console.log(setStartIndex);

  const handleScroll = useCallback(
    (scrollAmount) => {
      const newStartIndex = startIndex + scrollAmount;
      const newEndIndex = endIndex + scrollAmount;

      if (newStartIndex >= 0 && newEndIndex <= data.length) {
        const newItems = data.slice(newStartIndex, newEndIndex);
        setDisplayedItems(newItems);
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
      }
    },
    [data, startIndex, endIndex]
  );

  const handleEndReached = useCallback(() => {
    // When the user reaches the end, reset to the beginning of the array
    if (endIndex >= data.length) {
      setStartIndex(0);
      setEndIndex(itemsPerScroll);
      setDisplayedItems(data.slice(0, itemsPerScroll));
    }
  }, [endIndex, data, itemsPerScroll]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={displayedItems}
        keyExtractor={(item) => item.key}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        renderItem={({ item, index }) => (
          <View
            style={{
              padding: 25,
              backgroundColor: "transparent",
              opacity: index === 1 ? 0.5 : 1 // Set opacity for the second item
            }}
          >
            <Text>{item.value}</Text>
          </View>
        )}
      />
      <Button
        title="Scroll Up"
        onPress={() => handleScroll(-1)}
        disabled={startIndex === 0}
      />
      <Button
        title="Scroll Down"
        onPress={() => handleScroll(1)}
        disabled={endIndex >= data.length}
      />
    </View>
  );
};

export default ScrollableItems;
