import { useState } from "react";
import { EmptyPageStyle } from "./styeld";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";

interface EmptyProps {
  type?: string;
}

const EmptyPage = ({ type }: EmptyProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <EmptyPageStyle className="EmptyPage_wrap">
      <div className={`Empty_img ${type || ""}`}>
        {!loaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
          />
        )}
        <Image
          src="/dotori/emptyImg.png"
          alt="empty image"
          fill
          onLoad={() => setLoaded(true)}
        />
      </div>
    </EmptyPageStyle>
  );
};

export default EmptyPage;
