import React, { useEffect, useState, useCallback, FormEvent } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import styles from "./placeAutocomplete.module.css";
import { useDebounce } from "@/hooks";
interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const Autocomplete = ({ onPlaceSelect }: Props) => {
  const map = useMap();
  const places = useMapsLibrary("places");

  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] =
    useState<Array<google.maps.places.AutocompletePrediction>>();

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults(undefined);
        return;
      }

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken]
  );

  const fetchPredictionsDebounced = useDebounce(fetchPredictions, 700);

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value;

      setInputValue(value);
      fetchPredictionsDebounced(value);
    },
    [fetchPredictionsDebounced]
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ["geometry", "name", "formatted_address"],
        sessionToken,
      };

      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null
      ) => {
        onPlaceSelect(placeDetails);
        setPredictionResults(undefined);
        setInputValue(placeDetails?.formatted_address ?? "");
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );

  const handleClearInput = () => {
    setInputValue("");
    setPredictionResults(undefined);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={inputValue}
        onInput={(event: FormEvent<HTMLInputElement>) => onInputChange(event)}
        placeholder="Search for a place"
      />
      {inputValue && (
        <button className={styles.button} onClick={handleClearInput}>
          <svg className={styles.svg} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-10.95a1 1 0 00-1.414-1.414L10 8.586 7.879 6.465a1 1 0 10-1.414 1.414L8.586 10l-2.121 2.121a1 1 0 001.414 1.414L10 11.414l2.121 2.121a1 1 0 001.414-1.414L11.414 10l2.121-2.121z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {predictionResults && predictionResults?.length > 0 && (
        <div className={styles.customListContainer}>
          <ul className={styles.customList}>
            {predictionResults?.map(({ place_id, description }) => (
              <li
                key={place_id}
                className={styles.customListItem}
                onClick={() => handleSuggestionClick(place_id)}
              >
                {description}
              </li>
            ))}
          </ul>
        </div>
      )}
      {predictionResults?.length === 0 && (
        <div className={styles.customListContainer}>
          <ul className={styles.customList}>
            <li className={styles.customListItem}>No results found.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
