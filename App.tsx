import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import PasswordListScreen from "./screens/PasswordListScreen";
import AddEditPasswordScreen from "./screens/AddEditPasswordScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#4a90e2",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PasswordList"
            component={PasswordListScreen}
            options={{ title: "Your Passwords" }}
          />
          <Stack.Screen
            name="AddEditPassword"
            component={AddEditPasswordScreen}
            options={({ route }) => ({
              title: route.params?.passwordId
                ? "Edit Password"
                : "Add Password",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <StatusBar style="auto" /> */}
    </SafeAreaProvider>
  );
}
