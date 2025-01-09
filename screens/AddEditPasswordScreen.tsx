import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function AddEditPasswordScreen({ route, navigation }: any) {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordId = route.params?.passwordId;

  useEffect(() => {
    if (passwordId) {
      // TODO: Fetch password details if editing
      // For now, we'll just set some dummy data
      setTitle("Dummy Title");
      setUsername("dummy@example.com");
      setPassword("dummypassword");
    }
  }, [passwordId]);

  const handleSave = () => {
    // TODO: Implement actual save logic
    console.log("Saving:", { title, username, password });
    navigation.goBack();
  };

  const generatePassword = () => {
    // TODO: Implement actual password generation logic
    const generatedPassword = "GeneratedP@ssw0rd";
    setPassword(generatedPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inner}
      >
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          accessibilityLabel="Title input"
        />
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          accessibilityLabel="Username or Email input"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            accessibilityLabel="Password input"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            accessibilityLabel={
              showPassword ? "Hide password" : "Show password"
            }
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#4a90e2"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.generateContainer}>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={generatePassword}
          >
            <Text style={styles.generateButtonText}>Generate Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  inner: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  generateContainer: {
    marginBottom: 15,
  },
  generateButton: {
    backgroundColor: "#4a90e2",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  generateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4a90e2",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
