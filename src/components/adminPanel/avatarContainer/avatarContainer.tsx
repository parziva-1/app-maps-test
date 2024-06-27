import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./button";
import Image from "next/image";
import styles from "./avatarContainer.module.css";

const AvatarContainer = () => {
  const { data: session } = useSession();

  // checking if sessions exists
  if (session) {
    //logged in code
  }

  const handleButton = () => {
    if (session) {
      signOut();
      return;
    }
    signIn();
  };

  return (
    <section className={styles.avatarContainer}>
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
          />
        </>
      ) : null}
      {session ? (
        <Button type="" onClick={() => handleButton()}>
          signOut
        </Button>
      ) : (
        <Button type="signIn" onClick={() => handleButton()}>
          signIn
        </Button>
      )}
    </section>
  );
};

export default AvatarContainer;
