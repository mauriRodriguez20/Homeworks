import { IconUser, IconBuilding } from "@tabler/icons-react";

export default function Avatar({ type = "person", size = 28, title, className = "" }) {
  const isCity = type === "city";
  return (
    <span
      className={`avatar ${isCity ? "avatar--city" : "avatar--person"} ${className}`}
      title={title}
      aria-hidden={title ? undefined : true}
    >
      {isCity ? (
        <IconBuilding size={size * 0.7} stroke={1.8} />
      ) : (
        <IconUser size={size * 0.7} stroke={1.8} />
      )}
    </span>
  );
}
