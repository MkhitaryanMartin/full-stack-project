import { Player } from '@lordicon/react';
import {useEffect, useRef, useState} from 'react';
import "./style.scss"

type Props = {
    icon: any;
    size?: number;
    color?: string,
    event?: "mouseEnter" | "click";
    checked?:boolean;
    className?: string
}

export default function CreateIcon({
  icon,
  size=60,
  color="",
  event= "mouseEnter",
  checked= false,
  className=""
}: Props) {
const playerRef = useRef<Player>(null);

const [direction, setDirection] = useState<1|-1>(checked ? 1:-1);

useEffect(() => {
  playerRef.current?.play();
}, [direction]);

const onIconClick = () => {
  setDirection(direction === 1 ? -1 : 1);
}

return (
    <div
    className={`icon-default icon-${className}`}
    onMouseEnter={event === "mouseEnter" ? onIconClick : undefined}
    onClick={event === "click" ? onIconClick : undefined}
    >
      <Player
        ref={playerRef}
        size={size}
        icon={icon}
        state=""
       colorize={color}
      direction={direction}
      />
    </div>
);
}

