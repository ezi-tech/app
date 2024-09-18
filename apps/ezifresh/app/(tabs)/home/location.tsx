import { iconWithClassName } from "@/assets/icons/iconWithClassName";
import { Text } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import {
  CircleCheckIcon,
  LocateFixedIcon,
  MapPinIcon,
  XIcon,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

iconWithClassName(XIcon);
iconWithClassName(MapPinIcon);
iconWithClassName(CircleCheckIcon);
iconWithClassName(LocateFixedIcon);

export default function LocationScreen() {
  const router = useRouter();
  const utils = api.useUtils();
  const { data: addresses, isRefetching } = api.address.all.useQuery();

  const [query, setQuery] = useState("");
  const [showPredictions, setShowPredictions] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  function onSettled() {
    utils.address.default.invalidate();
    utils.address.all.invalidate().then(() => {
      setShowPredictions(false);
    });
  }

  const { data: currentAddress, isLoading } = api.address.placeDetails.useQuery(
    {
      latitude: location?.coords.latitude.toString(),
      longitude: location?.coords.longitude.toString(),
    },
  );

  const { data: predictions, mutate: autocomplete } =
    api.address.autocomplete.useMutation({
      onSettled: () => setShowPredictions(true),
    });

  const { mutate: createFromPlaceId, isPending: loadingPlace } =
    api.address.createFromPlaceId.useMutation({ onSettled });

  const { mutate: selectAddress, isPending: isSelecting } =
    api.address.select.useMutation({ onSettled });

  const { mutate: createFromLatLng, isPending: loadingLatLng } =
    api.address.createFromLatLng.useMutation({ onSettled });

  const loading =
    loadingPlace || isSelecting || loadingLatLng || isLoading || isRefetching;

  const requestLocationPermission = async () => {
    // Ask the user for permission to access location
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location permission is required for this feature to work.",
      );
      return;
    }

    // Get the current location if permission is granted
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // fetch predictions
  useEffect(() => {
    if (debouncedQuery) {
      autocomplete(debouncedQuery);
    }
  }, [debouncedQuery]);

  // set debounced query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return (
    <View className="h-full w-full bg-white">
      <SafeAreaView style={{ flex: 1 }}>
        <View className={cn("gap-6 p-6")}>
          <View className="flex flex-row items-center justify-center">
            <TouchableOpacity
              className="absolute left-0"
              onPress={() => router.back()}
            >
              <XIcon size={28} className="text-foreground" />
            </TouchableOpacity>
            <Text className="font-asap-semibold text-2xl">
              Delivery address
            </Text>
          </View>
          <TextField
            className="w-full"
            placeholder="Search for a location"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
        </View>

        <ScrollView className="h-full px-6">
          <TouchableOpacity
            onPress={() => {
              createFromLatLng({
                latitude: String(location!.coords.latitude),
                longitude: String(location!.coords.longitude),
              });
            }}
            className="flex flex-row items-center gap-4 border-t border-border py-4"
          >
            <LocateFixedIcon
              strokeWidth={1.5}
              size={32}
              className="text-primary"
            />
            <View>
              <Text className="font-asap-medium text-xl">Current location</Text>
              <Text className="-mt-0.5 pl-0.5 text-sm text-muted-foreground">
                {currentAddress ? currentAddress : "Allow location access"}
              </Text>
            </View>
          </TouchableOpacity>

          {showPredictions && predictions
            ? predictions.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.place_id}
                    onPress={async () => {
                      setQuery("");
                      createFromPlaceId({
                        placeId: item.place_id,
                      });
                    }}
                    className="flex flex-row items-center gap-4 border-t border-border py-4"
                  >
                    <MapPinIcon
                      strokeWidth={1.5}
                      size={28}
                      className="text-foreground"
                    />
                    <View>
                      <Text className="font-asap-medium text-xl">
                        {item.structured_formatting.main_text}
                      </Text>
                      <Text className="-mt-0.5 text-sm text-muted-foreground">
                        {item.structured_formatting.secondary_text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            : null}

          {!showPredictions && addresses?.length
            ? addresses.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      selectAddress({
                        id: item.id,
                      });
                    }}
                    className="flex flex-row items-center gap-4 border-t border-border py-4"
                  >
                    <MapPinIcon
                      strokeWidth={1.5}
                      size={28}
                      className="text-foreground"
                    />
                    <View>
                      <Text className="font-asap-medium text-xl">
                        {item.name}
                      </Text>
                      <Text className="-mt-0.5 text-sm text-muted-foreground">
                        {item.formattedAddress}
                      </Text>
                    </View>
                    {item.isDefault ? (
                      <CircleCheckIcon
                        strokeWidth={1.5}
                        size={36}
                        className="ml-auto fill-primary text-primary-foreground"
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              })
            : null}
        </ScrollView>
      </SafeAreaView>

      {loading ? (
        <View className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-white/50">
          <ActivityIndicator
            className="h-40 w-40"
            size="large"
            color="#32BB78"
          />
        </View>
      ) : null}
    </View>
  );
}
