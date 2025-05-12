import { BgmStyle } from "./styeld";

interface BgmInfo {
  id: number;
  acquired_at: string;
  storeItems: {
    id: number;
    name: string;
    artist: string | null;
    category: string;
    created_at: string;
    duration: number | null;
    file: string;
    price: number;
  };
}

interface BgmProps {
  bgm: BgmInfo[];
}

const Bgm = ({ bgm }: BgmProps) => {
  return (
    <BgmStyle>
      <div className="Bgm_table">
        <div className="Bgm_tableHeader">
          <div className="Bgm_column checkbox">
            <input type="checkbox" />
          </div>
          <div className="Bgm_column">번호</div>
          <div className="Bgm_column title">곡명</div>
          <div className="Bgm_column artist">아티스트</div>
        </div>

        {bgm.map((item, idx) => (
          <div key={item.id} className="Bgm_item">
            <div className="Bgm_column checkbox">
              <input type="checkbox" />
            </div>
            <div className="Bgm_column">{idx + 1}</div>
            <div className="Bgm_column title">{item.storeItems.name}</div>
            <div className="Bgm_column artist">{item.storeItems.artist}</div>
          </div>
        ))}
      </div>
    </BgmStyle>
  );
};

export default Bgm;
