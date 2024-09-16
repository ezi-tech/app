import { InputField } from "@/app/(auth)";
import { Card } from "@/components/ui/card";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { LogOut, Trash2 } from "lucide-react-native";
import { Separator } from "@/components/ui/separator";
import { TextField } from "@/components/ui/text-field";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [initialState, setInitialState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (user) {
      const [firstName = "", lastName = ""] = user.fullName?.split(" ") ??
        ["", ""];
      const phone = user.phoneNumbers?.[0]?.phoneNumber || "";

      const newState = { firstName, lastName, phone };
      setInitialState(newState);
      setState(newState);
    }
  }, [user]);

  const hasChanges = () =>
    JSON.stringify(initialState) !== JSON.stringify(state);

  const handleChange = (field: string, value: string) => {
    setState((prevState) => ({ ...prevState, [field]: value }));
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await user?.update({
        firstName: state.firstName,
        lastName: state.lastName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="">
      <View className="grid p-2 gap-4 h-full">
        <View className="flex flex-row w-full items-center">
          <Pressable
            onPress={() => router.back()}
          >
            <ArrowLeft
              className="w-4 h-4 p-4"
              color="black"
            />
          </Pressable>
          <Text className="text-lg font-semibold p-4 w-full">Profile</Text>
        </View>
        <Card className="flex w-full items-center gap-4 rounded-2xl p-5">
          <TextField
            placeholder="First Name"
            value={state.firstName}
            onChangeText={(value) => handleChange("firstName", value)}
            className="flex-grow w-full"
          />
          <TextField
            placeholder="Last Name"
            value={state.lastName}
            onChangeText={(value) => handleChange("lastName", value)}
             className="flex-grow w-full"
          />
          <InputField
            placeholder="Phone"
            value={state.phone}
            onChangeText={(value) => handleChange("phone", value)}
          />
          {hasChanges() && (
            <Pressable
              className="p-4 items-center rounded-full w-full bg-[#32BB78]"
              onPress={onSubmit}
            >
              {loading
                ? <ActivityIndicator color="white" />
                : (
                  <Text className="text-white text-[15px] font-bol">
                    Save
                  </Text>
                )}
            </Pressable>
          )}
        </Card>
        <Card className="flex w-full flex-col items-start gap-4 rounded-2xl p-5">
          <Pressable
            className="flex flex-row gap-2 items-center"
            onPress={() => {
              signOut();
            }}
          >
            <LogOut className="p-2" color="red" size={18} />
            <Text className="text-md text-red-500 font-normal p-1">
              Log out
            </Text>
          </Pressable>
        </Card>
      </View>
    </SafeAreaView>
  );
}
