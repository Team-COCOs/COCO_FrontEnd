import React from "react";
import clsx from "clsx";
import { ProfileInfoStyle } from "./styled";

interface ProfileInfoProps {
  label: string;
  value: number;
  showBadge?: boolean;
}

const ProfileInfo = ({ label, value, showBadge = true }: ProfileInfoProps) => {
  return (
    <ProfileInfoStyle className={clsx("Profile_infos")}>
      <span className="Profile_infoText">{label}</span>
      <span className={clsx(value > 0 && showBadge && "Profile_newText")}>
        {value}
        {value > 0 && showBadge ? <div className="Profile_new">N</div> : null}
      </span>
    </ProfileInfoStyle>
  );
};

export default ProfileInfo;
