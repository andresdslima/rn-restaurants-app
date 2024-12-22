import { Alert, FlatList } from "react-native";
import { styles } from "./styles";
import { Category, CategoryProps } from "../Category/Category";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

type CategoriesProps = {
  selected: string;
  onSelect: (id: string) => void;
};

export function Categories({ onSelect, selected }: CategoriesProps) {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      onSelect(data[0].id);
    } catch (error) {
      console.error(error);
      Alert.alert("Categorias", "Não foi possível carregar as categorias.");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.container}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          id={item.id}
          isSelected={item.id === selected}
          onPress={() => onSelect(item.id)}
        />
      )}
    />
  );
}
