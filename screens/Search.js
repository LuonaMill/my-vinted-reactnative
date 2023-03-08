import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import TopNavBar from "../components/TopNavBar";
import ArticleCard from "../components/ArticleCard";
import CustomText from "../components/CustomText";
import { ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../src/utils/colors";

export default function Search() {
  const { styles } = useStyle();
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(99999);
  const [sortingMethod, setSortingMethod] = useState("");
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   `https://site--backend-vinted--wbbmf4gr4bwy.code.run/offers?title=${search}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sortingMethod}`
        // );
        const response = await axios.get(
          `https://site--backend-vinted--wbbmf4gr4bwy.code.run/offers?limit=0&title=${search}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sortingMethod}`
        );
        setData(response.data);
        setisLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [search, priceMin, priceMax, sortingMethod]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <TopNavBar pageTitle="searchBar" goBack setState={setSearch} />
          {data.numberOfOffers !== 0 ? (
            <View style={styles.container}>
              <CustomText
                size={11}
                color={colors.vGrey}
                text={
                  data.numberOfOffers === 1
                    ? "1 résultat"
                    : `${data.numberOfOffers} résultats`
                }
              />
              <View style={styles.mainView}>
                <FlatList
                  data={data.offers}
                  renderItem={({ item }) => <ArticleCard article={item} />}
                  keyExtractor={(item) => `${item._id}2`}
                  numColumns={2}
                />
              </View>
            </View>
          ) : (
            <View>
              <CustomText text="Nous n'avons pas trouvé d'article correspondant à votre recherche" />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const useStyle = () => {
  const dimensions = useWindowDimensions();
  const styles = StyleSheet.create({
    safeAreaView: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      backgroundColor: "white",
      flex: 1,
    },
    container: {
      backgroundColor: "white",
      padding: 18,
    },
    mainView: {
      alignItems: "center",
    },
  });
  return { styles };
};
