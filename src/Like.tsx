import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface Props {
  onLike: () => void;
}

const Like = ({ onLike }: Props) => {
  const [like, setLike] = useState(false);

  const toggle = () => {
    setLike(!like);
    onLike();
  };

  if (like)
    return (
      <AiFillHeart onClick={toggle} color="#ff6b81" size={20} />
    );
  return <AiOutlineHeart size={20} onClick={toggle} />;
};

export default Like;
