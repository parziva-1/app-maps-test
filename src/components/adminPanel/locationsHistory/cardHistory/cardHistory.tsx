import { ILocation } from "@/lib/db/models/location";
import styles from "./cardHistory.module.css";

interface props {
  data: ILocation;
  handleSelectLocation: (location: ILocation["geometry"]["viewport"]) => void;
}

const CardHistory = ({ data, handleSelectLocation }: props) => {
  return (
    <div
      key={String(data.formatted_address)}
      className={styles.card}
      onClick={() => {
        console.log(data.geometry.viewport);
        const { _id, ...location } = data.geometry?.viewport;
        handleSelectLocation(location);
      }}
    >
      <p className={styles.name}>{data.name} </p>
      <p className={styles.address}>{data.formatted_address}</p>
    </div>
  );
};

export default CardHistory;
