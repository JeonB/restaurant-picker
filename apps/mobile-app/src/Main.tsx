import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Linking } from "react-native";
import { Text } from "@rneui/themed";
import { Button } from "react-native-paper";
import {
  RestaurantInfo,
  CategoryButton,
  RandomPickerModal,
  getData,
} from "@components";
import { Restaurant } from "types";

export function RandomPicker() {
  const [info, setInfo] = useState<Restaurant[]>([]);
  const [category, setCategory] = useState<string[]>([""]);
  const [showRandomPicker, setShowRandomPicker] = useState(false);
  const [placeNames, setPlaceNames] = useState<string[]>([]);
  const [selectedInfo, setSelectedInfo] = useState<Restaurant | null>();

  useEffect(() => {}, [category, info, placeNames, selectedInfo]);
  const fetchData = async (categories: string[]) => {
    try {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      //   const result = await randomPick(category);
      const result = await getData(randomCategory);
      //   setInfo(result !== undefined ? [result] : []);
      setInfo(result !== undefined ? result : []);
      setPlaceNames(
        result !== undefined && result.length > 0
          ? result.map((restaurant) => restaurant.place_name)
          : []
      );
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const [showRandomPickButton, setShowRandomPickButton] = useState(true);

  const handleClick = async () => {
    await fetchData(category);
    setShowRandomPicker(true);
    setShowRandomPickButton(false);
  };

  const handleIconClick = (rowData: Restaurant) => {
    Linking.openURL(rowData.place_url);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.postimg.cc/rpJGytmg/image.png" }}
        style={styles.image}
      />
      <View style={styles.categoryButton}>
        <CategoryButton category={category} setCategory={setCategory} />
      </View>
      <View style={styles.infoView}>
        <Text h4 h4Style={{ fontSize: 20, marginBottom: 10 }}>
          {info.length > 0 ? selectedInfo?.place_name : ""}
        </Text>
        <Text>{info.length > 0 ? selectedInfo?.category_name : ""}</Text>
      </View>
      {info.length > 0 && selectedInfo && (
        <View style={styles.infoView}>
          <RestaurantInfo info={selectedInfo} />
        </View>
      )}
      {showRandomPickButton ? (
        <Button
          style={styles.randomPickButton}
          icon="silverware-fork-knife"
          onPress={handleClick}
          //   onPress={() => setShowRandomPicker(true)}
          textColor="#003366"
        >
          Random Pick
        </Button>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => selectedInfo && handleIconClick(selectedInfo)}
            style={styles.detailButton}
          >
            <Text style={{ color: "white" }}>식당 상세 정보</Text>
          </Button>
          <Button
            style={styles.rechooseButton}
            icon="restart"
            onPress={handleClick}
            // onPress={() => setShowRandomPicker(true)}
            mode="outlined"
            textColor="#003366"
          >
            다시 선택
          </Button>
        </View>
      )}
      {info.length > 0 && (
        <RandomPickerModal
          visible={showRandomPicker}
          info={info}
          onClose={() => setShowRandomPicker(false)}
          onIndexChange={(itemIndex) => {
            setSelectedInfo(info[itemIndex]);
            setTimeout(() => setShowRandomPicker(false), 600);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryButton: {
    maxWidth: "50%",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 50,
    alignItems: "center",
    maxWidth: "90%",
  },
  randomPickButton: {
    margin: 20,
    padding: 4,
    width: 300,
    height: 50,
    textAlign: "center",
    backgroundColor: "#E8EAF6",
  },
  rechooseButton: {
    borderColor: "#003366",
    margin: 15,
    borderRadius: 5,
  },
  detailButton: {
    backgroundColor: "#2E6FCF",
    borderRadius: 5,
    width: 200,
    margin: 15,
  },
  infoView: {
    width: 400,
    alignItems: "center",
    margin: 5,
  },
  image: {
    width: "120%",
    height: "auto",
    aspectRatio: 1,
  },
});
