import styles from "./adminPanel.module.css";
import { AvatarContainer } from "./avatarContainer";

const AdminPanel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerCards}></div>
      <AvatarContainer />
    </div>
  );
};

export default AdminPanel;
