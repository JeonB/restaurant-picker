import React from "react";
import { View, Linking, StyleSheet } from "react-native";
import { Restaurant } from "@projectTypes";
import { Text } from "@rneui/themed";
import { Button } from "react-native-paper";

export function RestaurantInfo({ info }: { info: Restaurant[] | undefined }) {
  const handleIconClick = (rowData: Restaurant) => {
    // React Native에서는 window.open 대신 Linking.openURL을 사용합니다.
    Linking.openURL(rowData.place_url);
  };

  return (
    <View style={{ alignItems: "center" }}>
      {/* <Text h4 h4Style={{ fontSize: 20, marginBottom: 10 }}>
        Restaurant Info
      </Text> */}
      {info && (
        <View>
          {info.map((rowData) => (
            <View
              key={rowData.id}
              style={{ flexDirection: "row", marginBottom: 10 }}
            >
              <Button mode="outlined" onPress={() => handleIconClick(rowData)}>
                Details
              </Button>
              <Text style={{ marginLeft: 10 }}>{rowData.distance}</Text>
              <Text style={{ marginLeft: 10 }}>{rowData.phone}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  restaurantInfoText: { marginRight: 20 },
});
