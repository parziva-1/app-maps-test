import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./button";

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
    <section>
      {session ? (
        <Button  type="" onClick={() => handleButton()}>signOut</Button>
      ) : (
        <Button type="signIn" onClick={() => handleButton()}>signIn</Button>
      )}
    </section>
  );
};

export default AvatarContainer;
