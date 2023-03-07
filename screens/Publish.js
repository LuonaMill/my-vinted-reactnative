import {
  Dimensions,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import TopNavBar from "../components/TopNavBar";
import Input from "../components/Input";
import { colors } from "../src/utils/colors";
import { spacing } from "../src/utils/sizes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import axios from "axios";

export default function Publish({ token }) {
  const { styles } = useStyle();
  const [picture, setPicture] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  //* Envoi de la donnée vers serveur

  const handleSubmit = async () => {
    try {
      const uri = picture[0];
      const uriParts = uri.split(".");
      const fileType = uriParts[1];

      const formData = new FormData();
      formData.append("picture", {
        uri,
        name: `articlePicture`,
        type: `image/${fileType}`,
      });
      formData.append("title", title);
      formData.append("price", price);

      console.log(fileType);
      console.log(uri);

      const response = await axios.post(
        "http://localhost:4002/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            //send formData with axios make this headers EXPLICIT !
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Une erreur est survenue, veuillez réssayer"
      );
      console.log(error);
    }
  };

  //* Permission pour sélect image dans la galerie

  const getPermissionAndGetPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (result.canceled === true) {
        alert("Vous n'avez pas sélectionné d'image");
      } else {
        const newPictureTab = [...picture];
        newPictureTab.push(result.assets[0].uri);
        setPicture(newPictureTab);
        console.log(picture);
      }
    } else {
      alert("Permission refusée");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TopNavBar pageTitle="Vends ton article" />
      <KeyboardAwareScrollView>
        <View style={styles.addPictureView}>
          <TouchableOpacity
            style={styles.addPictureBtn}
            onPress={getPermissionAndGetPicture}
          >
            <Text style={styles.addPictureText}>+ Ajouter photos</Text>
          </TouchableOpacity>
          {picture.length > 0 && (
            <ScrollView horizontal style={styles.scrollview}>
              {picture.map((img, index) => {
                return (
                  <Image
                    style={styles.imgSize}
                    key={index}
                    source={{ uri: `${img}` }}
                  />
                );
              })}
            </ScrollView>
          )}
        </View>
        <View style={styles.borderBetweenViews}></View>
        <View style={styles.addArticleView}>
          <Input
            title="Titre"
            placeholder="ex: Chemise Sézane verte"
            setState={setTitle}
          />
          <Input
            title="Décris ton article"
            placeholder="ex: porté quelques fois, taille correctement"
          />
          <Input
            title="Prix"
            placeholder="A quel prix proposez-vous cet article ?"
            type="number"
            setState={setPrice}
          />
        </View>
        <View style={styles.borderBetweenViews}></View>
        <Button title="Ajouter un article" onPress={handleSubmit} />

        {price > 0 && (
          <View>
            <Text>{title}</Text>
            <Text>{price}</Text>
          </View>
        )}
      </KeyboardAwareScrollView>
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
      width: dimensions.width,
    },
    addPictureView: {
      width: dimensions.width,
      height: dimensions.height * 0.2,
      borderColor: colors.vLighterGrey,
      borderWidth: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    scrollview: {
      width: dimensions.width * 0.6,
    },
    addPictureBtn: {
      borderColor: colors.vBlue,
      borderWidth: 1,
      padding: spacing.sm,
      borderRadius: 5,
      margin: 10,
    },
    addPictureText: {
      color: colors.vBlue,
    },
    imgSize: {
      height: 120,
      width: 120,
      marginRight: 10,
    },
    borderBetweenViews: {
      height: 12,
      width: dimensions.width,
      backgroundColor: colors.vLightest2Grey,
    },
    addArticleView: {
      width: dimensions.width,
      // height: dimensions.height * 0.2,
      borderColor: colors.vLighterGrey,
      borderWidth: 1,
      backgroundColor: "white",
      // justifyContent: "center",
      alignItems: "center",
    },
  });
  return { styles };
};
