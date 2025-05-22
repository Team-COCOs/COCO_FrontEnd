import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ProfileInfoStyle } from "./styled";
import ShadowModal from "@/components/ShadowModal";
import { useAuth } from "@/context/AuthContext";

interface ProfileInfoProps {
  label: string;
  value: number;
  showBadge?: boolean;
  data?: any;
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

  console.log(data);

  const type = label === "새게시물" ? "newPost" : "newFriend";

  return (
    <ProfileInfoStyle
      className={clsx("Profile_infos")}
      onClick={label === "일촌신청" ? undefined : () => setIsOpen(true)}
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
