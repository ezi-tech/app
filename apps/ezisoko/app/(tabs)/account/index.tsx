import { useAuth } from '@clerk/clerk-expo';
import {View, Text, SafeAreaView, Pressable } from 'react-native';

export default function AccountScreen() {
    const {signOut} = useAuth();
  return (
    <SafeAreaView>
      <Pressable onPress={()=>signOut()}>
        <Text>Sign Out</Text>
        </Pressable>
    </SafeAreaView>
  );
}
