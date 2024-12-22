import { Alert, View } from "react-native";
import { globalStyles } from "./global";
import { Welcome } from "@/components/Welcome/Welcome";
import { Button } from "@/components/Button/Button";
import { router } from "expo-router";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { useState } from "react";
import { credentialsMock } from "@/data/data";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    try {
      setIsLoading(true);
      const { email: emailMock, password: passwordMock } = credentialsMock;
      if (email === emailMock && password === passwordMock) {
        router.navigate("/home");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Email ou senha inválidos");
    } finally {
      setEmail("");
      setPassword("");
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Welcome />
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      <Button text="Login" onPress={handleLogin} isLoading={isLoading} />
    </View>
  );
}
