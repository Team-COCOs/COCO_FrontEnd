import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ProfileInfoStyle } from "./styled";
import ShadowModal from "@/components/ShadowModal";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

interface ProfileInfoProps {
  label: string;
  value: number;
  showBadge?: boolean;
  data?: any;
}
interface data {
  id: number;
  title?: string;
  content?: string;
  createdAt?: string;
  requester?: string;
  profileImg?: string;
  receivedAt?: string;
  message?: string;
  requester_name?: string;
  receiver_name?: string;
}

const ProfileInfo = ({
  label,
  value,
  showBadge = true,
  data,
}: ProfileInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const userName = user?.name;

  const type = label === "새게시물" ? "newPost" : "newFriend";

  return (
    <ProfileInfoStyle
      className={clsx("Profile_infos")}
      onClick={label !== "오늘방문자" ? () => setIsOpen(true) : undefined}
    >
      <span className="Profile_infoText">{label}</span>
      <span className={clsx(value > 0 && showBadge && "Profile_newText")}>
        {value}
        {value > 0 && showBadge ? <div className="Profile_new">N</div> : null}
      </span>

      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        data={data}
        userName={userName}
      />
    </ProfileInfoStyle>
  );
};

export default ProfileInfo;
