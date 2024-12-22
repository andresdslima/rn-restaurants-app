import { View, Text, TextInput } from "react-native";
import { styles } from "./styles";
import { useState } from "react";

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

type TextInputType = "email" | "password";

export function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
}: LoginFormProps) {
  const [emailInput, setEmailInput] = useState(email);
  const [passwordInput, setPasswordInput] = useState(password);

  const handleOnChange = (text: string, type: TextInputType) => {
    switch (type) {
      case "email":
        setEmailInput(text);
        setEmail(text);
        break;
      case "password":
        setPasswordInput(text);
        setPassword(text);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={emailInput}
        onChangeText={(text) => handleOnChange(text, "email")}
        textContentType="emailAddress"
        keyboardType="email-address"
        style={styles.input}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={passwordInput}
        onChangeText={(text) => handleOnChange(text, "password")}
        textContentType="password"
        style={styles.input}
        secureTextEntry
      />
    </View>
  );
}
