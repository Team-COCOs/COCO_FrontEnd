import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { DropdownStyle } from "./styled";
import clsx from "clsx";

interface DropdownProps {
  label: string;
  options: { id: number; request: string; requester_name: string }[];
}

const Dropdown = ({ label, options }: DropdownProps) => {
  const router = useRouter();

  console.log(options);

  // select 여닫기
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("바로가기");
  const wrapperRef = useRef<HTMLDivElement>(null); // 바깥 감지 -> 외부 클릭 시 select 닫기

  // option 클릭 시
  const handleSelect = (friend: any) => {
    setSelectedLabel(friend.name);
    setIsOpen(false);
    router.push(`/cocoworld/${friend.id}`);
  };

  // select option 열렸을 때 외부 클릭 시 select 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownStyle className={clsx("Dropdown_select")} ref={wrapperRef}>
      <button className="Dropdown_default" onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel}
        <p className="Dropdown_arrow"> ▾ </p>
      </button>
      {isOpen && (
        <ul className="Dropdown_options">
          {options.map((option) => (
            <li
              key={option.id}
              className="Dropdown_option"
              onClick={() => handleSelect(option)}
            >
              {option.request} ({option.requester_name})
            </li>
          ))}
        </ul>
      )}
    </DropdownStyle>
  );
};

export default Dropdown;
