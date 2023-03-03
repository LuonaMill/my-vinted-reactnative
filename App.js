import "react-native-gesture-handler";

// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// import Apploading from "expo-app-loading";

import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import SplashScreenTest from "./screens/SplashScreen";
import HomeLogin from "./screens/HomeLogin";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Publish from "./screens/Publish";
import Profile from "./screens/Profile";
import Search from "./screens/Search";

//! Pour ma navigation, je vais utiliser des stacks screens et des tab screens
// Arrivée sur l'appli :
// 1- SplashScreen
// Si pas de token  : 2- Login Screen et redirection possible vers SignupScreen
// Si token : 3 - Tab Navigator avec 4 Bottom tab screens : Accueil / Chercher / Vendre / Profil
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen
          name="HomeLogin"
          options={{ headerShown: false }}
          component={HomeLogin}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Tab" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "TabHome") {
                    focused ? (iconName = "home") : (iconName = "home-outline");
                  } else if (route.name === "TabSearch") {
                    focused
                      ? (iconName = "search")
                      : (iconName = "search-outline");
                  } else if (route.name === "TabPublish") {
                    focused
                      ? (iconName = "add-circle")
                      : (iconName = "add-circle-outline");
                  } else if (route.name === "TabProfile") {
                    focused
                      ? (iconName = "person")
                      : (iconName = "person-outline");
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: "#09B1BA",
                tabBarInactiveTintColor: "grey",
              })}
            >
              <Tab.Screen
                name="TabHome"
                options={{
                  tabBarLabel: "Accueil",
                  tabBarBadge: 3,
                }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="Accueil" component={Home} />
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen
                name="TabSearch"
                options={{ tabBarLabel: "Chercher" }}
              >
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Rechercher un article"
                      component={Search}
                    />
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen name="TabPublish" options={{ tabBarLabel: "Vendre" }}>
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="Vendre" component={Publish} />
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen name="TabProfile" options={{ tabBarLabel: "Profil" }}>
                {() => (
                  <Stack.Navigator>
                    <Stack.Screen name="Profil" component={Profile} />
                  </Stack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </Stack.Screen>
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
