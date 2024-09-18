import { AccountLayout } from "@/components/account-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { iconWithClassName } from "@/lib/icons/iconWithClassName";
import { useRouter } from "expo-router";
import { ArrowLeftIcon, EditIcon } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const addresses = [
  {
    id: 1,
    name: "Home",
    default: true,
    address: "123, Main Street, Nairobi, Kenya",
    contactName: "John Doe",
    contactNumber: "+254 712 345 678",
  },
  {
    id: 2,
    name: "Work",
    address: "456, Industrial Area, Nairobi, Kenya",
    contactName: "Jane Doe",
    contactNumber: "+254 712 345 678",
  },
  {
    id: 3,
    name: "Grandma's",
    address: "789, Village Road, Nairobi, Kenya",
    contactName: "Grandma Doe",
    contactNumber: "+254 712 345 678",
  },
];

iconWithClassName(EditIcon);
iconWithClassName(ArrowLeftIcon);

export default function Addresses() {
  const router = useRouter();

  return (
    <>
      <AccountLayout title="Addresses">
        <Text className="text-lg text-muted-foreground">
          Manage your delivery addresses here and easily select them when
          placing orders.
        </Text>
        <View className="my-4 flex gap-4">
          {addresses.map((address, idx) => (
            <Card
              key={idx}
              className="relative flex flex-row items-center justify-between gap-4 rounded-xl p-4"
            >
              {address.default && (
                <View className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-accent p-1.5 px-3">
                  <Text className="text-white">Default</Text>
                </View>
              )}
              <View className="flex gap-2">
                <Text className="font-asap-semibold text-lg">
                  {address.name}
                </Text>
                <Text className="text-muted-foreground">{address.address}</Text>
                <Text className="text-muted-foreground">
                  {address.contactNumber} ({address.contactName})
                </Text>
              </View>
              <EditIcon strokeWidth={1.5} className="text-muted-foreground" />
            </Card>
          ))}
        </View>
        <View className="h-32" />
      </AccountLayout>

      <View className="absolute bottom-0 w-full px-5 py-8">
        <Button
          size="lg"
          className="native:h-16 flex w-full items-center justify-center rounded-full"
        >
          <Text className="font-asap-medium native:text-xl text-primary-foreground">
            Add New Address
          </Text>
        </Button>
      </View>
    </>
  );
}
