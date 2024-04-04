import React from "react";
import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";

interface GroupRadioButtonProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function GroupRadioButton({
  category,
  setCategory,
}: GroupRadioButtonProps) {
  return (
    <View style={{ justifyContent: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton.Android
            value="올랜덤"
            status={category === "" ? "checked" : "unchecked"}
            onPress={() => setCategory("")}
          />
          <Text style={{ marginLeft: 1 }}>올랜덤</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton.Android
            value="한식"
            status={category === "한식" ? "checked" : "unchecked"}
            onPress={() => setCategory("한식")}
          />
          <Text style={{ marginLeft: 1 }}>한식</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton.Android
            value="일식"
            status={category === "일식" ? "checked" : "unchecked"}
            onPress={() => setCategory("일식")}
          />
          <Text style={{ marginLeft: 1 }}>일식</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton.Android
            value="중식"
            status={category === "중식" ? "checked" : "unchecked"}
            onPress={() => setCategory("중식")}
          />
          <Text style={{ marginLeft: 1 }}>중식</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton.Android
            value="양식"
            status={category === "양식" ? "checked" : "unchecked"}
            onPress={() => setCategory("양식")}
          />
          <Text style={{ marginLeft: 1 }}>양식</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton.Android
            value="분식"
            status={category === "분식" ? "checked" : "unchecked"}
            onPress={() => setCategory("분식")}
          />
          <Text style={{ marginLeft: 1 }}>분식</Text>
        </View>
      </View>
    </View>
  );
}
