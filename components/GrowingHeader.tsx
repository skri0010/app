import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";

interface GrowingHeaderProps {
  scrollY?: Animated.Value; // Optional, used only when growth is enabled
  title: string;
  backgroundColor?: string;
  enableGrowth?: boolean; // Prop to toggle growth behavior
  onBackPress?: () => void; // Function to handle back button press
}

const GrowingHeader: React.FC<GrowingHeaderProps> = ({
  scrollY = new Animated.Value(0), // Default value if not provided
  title,
  backgroundColor = "rgb(44, 45, 50)",
  enableGrowth = false,
  onBackPress,
}) => {
  const headerHeight = enableGrowth
    ? scrollY.interpolate({
        inputRange: [0, 100], // Adjust this range based on desired effect
        outputRange: [200, 80], // Max and min height for the header
        extrapolate: "clamp",
      })
    : 80; // Default smaller height when growth is disabled

  const fontSize = enableGrowth
    ? scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [24, 16], // Adjust font size based on scroll
        extrapolate: "clamp",
      })
    : 16; // Default font size when growth is disabled

  const opacity = enableGrowth
    ? scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0.5], // Hide text when scrolling
        extrapolate: "clamp",
      })
    : 1; // Default opacity when growth is disabled

  return (
    <Animated.View
      style={[
        styles.header,
        { height: headerHeight, backgroundColor: backgroundColor, opacity },
      ]}
    >
      <Animated.View style={styles.headerContent}>
        {/* Back Button */}
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        {/* Title */}
        <Animated.Text style={[styles.headerText, { fontSize: fontSize }]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 1000,
  },
  headerText: {
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
  headerContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 40, // To account for safe area
    marginBottom: 16,
    shadowColor: colors.black,
  },
  backButton: {
    marginRight: 16,
  },
});

export default GrowingHeader;
