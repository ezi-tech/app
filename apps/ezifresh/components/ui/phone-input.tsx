import { cn } from "@/lib/utils";
import { useState } from "react";
import { TextInput, View } from "react-native";

import { Text } from "./text";

export function PhoneInput({
  placeholder,
  value,
  onChangeText,
  error,
  countryCode,
}: React.ComponentPropsWithoutRef<typeof TextInput> & {
  error?: string;
  countryCode: string;
  setCountryCode: (countryCode: string) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <View className="flex w-full flex-row items-center gap-4">
        <View className="rounded-xl bg-muted p-4 px-8">
          <TextInput
            editable={false}
            value={countryCode}
            className="text-xl text-foreground opacity-100"
          />
        </View>
        <View
          className={cn(
            "flex-grow rounded-xl border-2 p-4 px-6",
            isFocused
              ? "border-primary bg-white"
              : "border-transparent bg-muted",
          )}
        >
          <TextInput
            autoFocus={true}
            className={cn("text-xl")}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            underlineColorAndroid="transparent"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </View>
      {error && <Text className="text-base text-red-500">{error}</Text>}
    </>
  );
}
