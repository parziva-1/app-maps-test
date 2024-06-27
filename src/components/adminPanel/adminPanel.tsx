import styles from "./adminPanel.module.css";
import { AvatarContainer } from "./avatarContainer";
import { LocationsHistory } from "./locationsHistory";

const AdminPanel = () => {
  return (
    <div className={styles.container}>
      <LocationsHistory />
      <AvatarContainer />
    </div>
  );
};

export default AdminPanel;
