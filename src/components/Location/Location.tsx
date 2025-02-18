"use client";
import { Icon } from "@mossoft/ui-kit";
import { useEffect, useState } from "react";
import AppText from "../AppText/AppText";
import {
  useGeolocationServiceGetCityByCoordinates,
  useGeolocationServiceGetCityByCoordinatesKey,
} from "@/src/openapi/queries";

type LocationParams = {
  latitude: number;
  longitude: number;
};

const Location = () => {
  const [location, setLocation] = useState<LocationParams | null>(null);
  const { data } = useGeolocationServiceGetCityByCoordinates(
    { lat: location?.latitude!, lon: location?.longitude! },
    [useGeolocationServiceGetCityByCoordinatesKey],
    { enabled: !!location }
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      setLocation({ latitude, longitude });
    });
  }, []);

  return (
    <div className="flex flex-row gap-2 items-center bg-primary py-1 px-3 rounded-[25px]">
      <Icon name="location" className="w-4 h-4 !text-white" />
      {data?.length && (
        <AppText className="text-white font-normal text-sm">
          {data || ""}
        </AppText>
      )}
    </div>
  );
};

export default Location;
