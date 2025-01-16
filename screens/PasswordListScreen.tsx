import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import GrowingHeader from "../components/GrowingHeader"; // Adjust the path based on your file structure
import colors from "../styles/colors";

const dummyPasswords = [
  { id: "1", title: "Gmail", username: "user@gmail.com" },
  { id: "2", title: "Facebook", username: "user@facebook.com" },
  { id: "3", title: "Twitter", username: "user@twitter.com" },
  { id: "4", title: "LinkedIn", username: "user@linkedin.com" },
  { id: "5", title: "GitHub", username: "user@github.com" },
  { id: "6", title: "Instagram", username: "user@instagram.com" },
  { id: "7", title: "Reddit", username: "user@reddit.com" },
  { id: "8", title: "Twitch", username: "user@twitch.com" },
  { id: "9", title: "Pinterest", username: "pinter" },
];

export default function PasswordListScreen({
  navigation,
}: {
  navigation: any;
}) {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("AddEditPassword", { passwordId: item.id })
      }
      accessibilityLabel={`Edit password for ${item.title}`}
    >
      <View style={styles.itemContent}>
        <Ionicons name="lock-closed" size={24} color={colors.gold} />
        <View style={styles.itemText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.username}>{item.username}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Reusable Growing Header */}
      <GrowingHeader
        scrollY={scrollY}
        title="Your Passwords"
        enableGrowth={true}
        onBackPress={() => navigation.goBack()}
      />

      {/* Password List */}
      <Animated.FlatList
        data={dummyPasswords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddEditPassword")}
        accessibilityLabel="Add new password"
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37393e", // Light background
  },
  list: {
    padding: 16,
    paddingTop: 200, // Accounts for the header height
  },
  item: {
    backgroundColor: colors.darkGrey, // White for items
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white, // Dark gray for high contrast text
  },
  username: {
    fontSize: 14,
    color: colors.gold, // Muted gray for secondary text
    marginTop: 4,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.gold, // Accent blue for the button
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
