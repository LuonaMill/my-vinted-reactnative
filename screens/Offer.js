import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

export default function Offer() {
  const route = useRoute();
  const offerId = route.params.id;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOfferById = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--wbbmf4gr4bwy.code.run/offer/${offerId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchOfferById();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <View>
            <Image
              source={{ uri: `${data.product_image?.secure_url}` }}
              style={styles.imageCard}
            />
            <Text>Here is Offer screen{offerId}</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "darkmagenta",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imageCard: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
});
