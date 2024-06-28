import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./button";
import Image from "next/image";
import styles from "./avatarContainer.module.css";
import { clearCookie } from "@/lib/helpers";

const AvatarContainer = () => {
  const { data: session } = useSession();

  const handleButton = () => {
    if (session) {
      signOut();
      clearCookie("user_id");
      clearCookie("user_type");
      return;
    }
    signIn();
  };

  return (
    <section
      className={`${styles.avatarContainer} ${session && styles.signIn}`}
    >
      {session ? (
        <>
          <p className={styles.userName}>{session?.user?.name}</p>
          <p className={styles.userEmail}>{session?.user?.email}</p>
          <Image
            src={session.user?.image ?? ""}
            alt="avatar-image"
            className={styles.avatarImage}
            width={80}
            height={80}
            priority
          />
        </>
      ) : null}
      {session ? (
        <Button type="" onClick={() => handleButton()}>
          Sign Out
        </Button>
      ) : (
        <Button type="signIn" onClick={() => handleButton()}>
          Sign In
        </Button>
      )}
    </section>
  );
};

export default AvatarContainer;
