import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Fireflies from "../../components/Fireflies";
import Animated, { FadeInDown } from "react-native-reanimated";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

// Path to your image
const bg = require("../../assets/img/intro.png");

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Login Failed", error.message);
    } else {
      router.replace("/(dashboard)/profile"); // or wherever you want to redirect
    }
  };

  return (
    <ImageBackground source={bg} style={styles.background} resizeMode="cover">
      <View style={styles.overlay} />

      <Fireflies count={30} />

      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        style={styles.container}
      >
        <ThemedText title={true} style={styles.title}>
          Welcome Back
        </ThemedText>

        <Spacer height={40} />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Spacer height={20} />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <Spacer height={30} />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <ThemedText style={styles.buttonText}>
            {loading ? "Logging in..." : "Login"}
          </ThemedText>
        </TouchableOpacity>

        <Spacer height={20} />

        <Link href="/register">
          <ThemedText style={styles.linkText}>
            Don’t have an account? Register here
          </ThemedText>
        </Link>
      </Animated.View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // night theme overlay
  },
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    width: "90%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    color: "#FFD700",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 10,
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  linkText: {
    color: "#eee",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
