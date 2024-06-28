import { ILocation } from "@/components/models/location";
import styles from "./cardHistory.module.css";
import { MouseEvent } from "react";
import { useLocations } from "@/hooks";

interface props {
  data: ILocation;
  handleSelectLocation: (
    viewport: ILocation["geometry"]["viewport"],
    location: ILocation["geometry"]["location"],
    name: string
  ) => void;
}

const CardHistory = ({ data, handleSelectLocation }: props) => {
  const { removeLocation } = useLocations();
  const handleDeleteClick = (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    removeLocation(data._id as string);
  };

  return (
    <div
      className={styles.card}
      onClick={() => {
        const { _id, ...viewport } = data.geometry?.viewport;
        const { location, ...rest } = data.geometry;

        handleSelectLocation(viewport, location, data.name);
      }}
    >
      <div className={styles.delete_icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          onClick={(e) => handleDeleteClick(e)}
        >
          <path
            fill="#000000"
            d="M19,6.41L17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z"
          />
        </svg>
      </div>

      <p className={styles.name}>{data.name} </p>
      <p className={styles.address}>{data.formatted_address}</p>
    </div>
  );
};

export default CardHistory;
