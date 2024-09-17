import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { TextInput, View } from "react-native";


const TextField = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={cn(
        "relative rounded-xl border-2 p-4",
        isFocused ? "border-primary bg-white" : "border-transparent bg-muted",
        className,
      )}
    >
      <TextInput
        ref={ref}
        className={cn("rounded-xl text-xl placeholder:text-lg placeholder:text-muted-foreground/40", props.editable === className)}
        placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
});

TextField.displayName = "TextField";

export { TextField };
