import { InputField } from "@/app/(auth)";
import { AccountLayout } from "@/components/account-layout";
import { Card } from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text
} from "react-native";

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
      const [firstName = "", lastName = ""] = user.fullName?.split(" ") ?? [
        "",
        "",
      ];
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
    <AccountLayout title="Profile">
      <Card className="flex w-full items-center gap-4 rounded-2xl p-5">
        <TextField
          placeholder="First Name"
          value={state.firstName}
          onChangeText={(value) => handleChange("firstName", value)}
          className="w-full flex-grow"
        />
        <TextField
          placeholder="Last Name"
          value={state.lastName}
          onChangeText={(value) => handleChange("lastName", value)}
          className="w-full flex-grow"
        />
        <InputField
          placeholder="Phone"
          value={state.phone}
          onChangeText={(value) => handleChange("phone", value)}
        />
        {hasChanges() && (
          <Pressable
            className="w-full items-center rounded-full bg-[#32BB78] p-4"
            onPress={onSubmit}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="font-bol text-[15px] text-white">Save</Text>
            )}
          </Pressable>
        )}
      </Card>
      <Card className="flex w-full flex-col items-start gap-4 rounded-2xl p-5">
        <Pressable
          className="flex flex-row items-center gap-2"
          onPress={() => {
            signOut();
          }}
        >
          <LogOut className="p-2" color="red" size={18} />
          <Text className="text-md p-1 font-normal text-red-500">Log out</Text>
        </Pressable>
      </Card>
    </AccountLayout>
  );
}
