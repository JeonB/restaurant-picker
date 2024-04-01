import React, { useState } from "react";
import { Filters } from "components/categoryFilter";
import { StyleSheet } from "react-native";

interface CategoryButtonProps {
  category: string[];
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CategoryButton = ({
  category,
  setCategory,
}: CategoryButtonProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (selectedValues: string[]) => {
    setSelectedCategories(selectedValues);
    setCategory(selectedValues);
  };

  return (
    <Filters
      data={[
        { label: "ALL", value: "" },
        { label: "한식", value: "한식" },
        { label: "일식", value: "일식" },
        { label: "중식", value: "중식" },
        { label: "양식", value: "양식" },
        { label: "분식", value: "분식" },
      ]}
      onValueChange={handleCategoryChange}
    />
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    maxWidth: "80%",
    alignItems: "center",
  },
});
