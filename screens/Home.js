import {
  Dimensions,
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TopNavBar from "../components/TopNavBar";
import ArticleCard from "../components/ArticleCard";

export default function Home({ userToken, userId }) {
  const { styles } = useStyle();
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await axios.get(
        `https://site--backend-vinted--wbbmf4gr4bwy.code.run/offers`
      );
      setData(response.data.offers);
      setIsLoading(false);
    };
    fetchOffers();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading ? (
        <>
          <TopNavBar pageTitle="Annonces" />
          <ActivityIndicator />
        </>
      ) : (
        <>
          <TopNavBar pageTitle="Annonces" />
          {/* <ScrollView>
            <View style={[styles.wrap, styles.row, styles.centered]}>
              {data.map((offer) => {
                return (
                  <TouchableOpacity
                    key={offer._id}
                    style={styles.cardView}
                    onPress={() => {
                      navigation.navigate("Offre", { id: offer._id });
                    }}
                  >
                    <Text>{offer.owner.account.username} </Text>
                    <Image
                      style={styles.imageCard}
                      source={{ uri: `${offer.product_image?.secure_url}` }}
                    />
                    <View style={styles.row}>
                      <Text>{offer.product_price} €</Text>
                      {!favorite ? (
                        <Ionicons
                          key={offer._id}
                          name="heart-outline"
                          size={16}
                          color="black"
                          onPress={() => {
                            setFavorite(true);
                          }}
                        />
                      ) : (
                        <Ionicons
                          key={offer._id}
                          name="heart-sharp"
                          size={16}
                          color="black"
                          onPress={() => {
                            setFavorite(false);
                          }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}

             
            </View>
          </ScrollView> */}
          <View style={styles.mainView}>
            {/* <Text>Nombre</Text> */}
            <FlatList
              data={data}
              renderItem={({ item }) => <ArticleCard article={item} />}
              keyExtractor={(item) => `${item._id}`}
              numColumns={2}
            />
          </View>
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
      flex: 1,
      backgroundColor: "white",
      width: dimensions.width,
    },
    mainView: {
      // backgroundColor: "pink",
      alignItems: "center",
    },

    centered: {
      alignItems: "center",
      justifyContent: "center",
    },
    row: {
      flexDirection: "row",
    },
    wrap: {
      flexWrap: "wrap",
      // gap: 10,
    },
    imageCard: {
      // wdth: 400,
      width: dimensions.width * 0.4,
      // height: 300,
      height: dimensions.height * 0.3,
      borderRadius: 10,
    },
  });
  return { styles };
};
