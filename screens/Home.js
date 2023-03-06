import {
  Dimensions,
  ActivityIndicator,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
import { spacing } from "../src/utils/sizes";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function Home({ userToken, userId }) {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await axios.get("http://localhost:4002/offers");
      setData(response.data.offers);
      setIsLoading(false);
    };
    fetchOffers();
  }, []);

  const handleFavorite = async (event) => {
    if (!favorite) {
      const addToFavorite = await axios.post(
        `http://localhost:4002/user/favorites/${userToken}`,
        {
          token: userToken,
          product_name: data.product_name,
          offerId: data._id,
        }
      );
      console.log(response.data._id);
      setFavorite(true);
    } else {
      // const deleteFavorite = await axios.delete(
      //   `http://localhost:4002/user/favorites/${userToken}`
      // );
      alert("Déjà dans tes favs");
    }
  };

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
          <ScrollView>
            <View
              style={[
                styles.wrap,
                styles.row,
                styles.centered,
                { width: width },
              ]}
            >
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
                    <Text>{offer._id} </Text>
                    <Image
                      style={styles.imageCard}
                      source={{ uri: `${offer.product_image.secure_url}` }}
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
                          // onPress={handleFavorite}
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
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    flex: 1,
    backgroundColor: "white",
    width: windowWidth,
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
    gap: 10,
  },
  imageCard: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
});
