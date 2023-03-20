import { useAsync } from "react-use";
import { createAvatar } from "@dicebear/core";
import {
  funEmoji,
  adventurer,
  adventurerNeutral,
  bigEars,
  bottts,
  lorelei,
  personas,
  avataaars,
  bigEarsNeutral,
  bigSmile
} from "@dicebear/collection";

const Avatar = () => {
  const name = [
    funEmoji,
    adventurer,
    adventurerNeutral,
    bigEars,
    bottts,
    lorelei,
    personas,
    avataaars,
    bigEarsNeutral,
    bigSmile
  ][Math.floor(Math.random() * 10)];
  const avatar = useAsync(() => {
    return createAvatar(name, {
      // ... other options
    }).toDataUri();
  }, []);

  return avatar.loading ? null : (
    <img
      className='rounded-full'
      src={avatar.value}
      alt='Avatar'
      width='48px'
      height='48px'
      title="avatar"
    />
  );
};

export default Avatar;
