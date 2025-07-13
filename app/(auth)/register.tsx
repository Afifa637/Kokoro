import { useState } from "react";
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
import { supabase } from "../../lib/supabase";

const bg = require("../../assets/img/intro.png");

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirm) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
  
    setLoading(true);
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      Alert.alert("Registration failed", error.message);
      setLoading(false);
      return;
    }
  
    const user = data?.user;
  
    if (!user?.id) {
      Alert.alert("Error", "User ID missing after signup");
      setLoading(false);
      return;
    }
  
    try {
      // 🔍 Check if profile exists
      const { data: existingProfile, error: selectError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();
  
      if (selectError) {
        throw new Error(selectError.message);
      }
  
      // ➕ Insert if not exists
      if (!existingProfile) {
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            username: email.split("@")[0],
            avatar_url: null,
            mood: null,
          },
        ]);
  
        if (insertError) {
          throw new Error(insertError.message);
        }
      }
    } catch (err: any) {
      console.error("Profile setup error:", err);
      Alert.alert("Error", err.message || "Unexpected error occurred.");
      setLoading(false);
      return;
    }
  
    Alert.alert("Success", "Registered! You can now login.");
    setLoading(false);
    router.replace("/login");
  };
  

  return (
    <ImageBackground source={bg} style={styles.background} resizeMode="cover">
      <View style={styles.overlay} />
      <Fireflies count={30} />

      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        style={styles.container}
      >
        <ThemedText title style={styles.title}>
          Create Account
        </ThemedText>

        <Spacer height={40} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
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
        <Spacer height={20} />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={styles.input}
          value={confirm}
          onChangeText={setConfirm}
        />

        <Spacer height={30} />
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          <ThemedText style={styles.buttonText}>
            {loading ? "Registering..." : "Register"}
          </ThemedText>
        </TouchableOpacity>

        <Spacer height={20} />
        <Link href="/login">
          <ThemedText style={styles.linkText}>
            Already have an account? Login here
          </ThemedText>
        </Link>
      </Animated.View>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
