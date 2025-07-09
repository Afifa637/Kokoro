// app/dashboard/chat.tsx
import { Redirect } from 'expo-router';

export default function RedirectToChat() {
  return <Redirect href="/(chat)/chat" />; // Use the correct path to your target screen
}
