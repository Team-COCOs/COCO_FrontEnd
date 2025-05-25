import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { DropdownStyle } from "./styled";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";

interface DropdownProps {
  label: string;
  options?: { userId: number; friend: string; theirNaming: string }[];
  folderOption?: { id: number; title: string; parent_id: number | null }[];
  publicOption?: { id: string; title: string }[];
  onSelect?: (selected: any) => void;
  selected?:
    | { id: number; title: string; parent_id: number | null }
    | { id: string; title: string }
    | null;
}

const Dropdown = ({
  label,
  options,
  folderOption,
  publicOption,
  selected,
  onSelect,
}: DropdownProps) => {
  const router = useRouter();
  const { user } = useAuth();

  // select 여닫기
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(label);
  const wrapperRef = useRef<HTMLDivElement>(null); // 바깥 감지 -> 외부 클릭 시 select 닫기

  // option 클릭 시
  const handleSelect = (item: any) => {
    setSelectedLabel(item.title || item.name);
    setIsOpen(false);
    if (onSelect) onSelect(item);
    if (item.userId) router.push(`/home/${item.userId}`);
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

  // 수정 시
  useEffect(() => {
    if (selected) {
      setSelectedLabel(selected.title);
    } else {
      setSelectedLabel(label);
    }
  }, [selected, label]);

  const truncate = (str: string, maxLength: number = 6) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "...";
  };

  return (
    <DropdownStyle className={clsx("Dropdown_select")} ref={wrapperRef}>
      <button className="Dropdown_default" onClick={() => setIsOpen(!isOpen)}>
        {selectedLabel}
        <p className="Dropdown_arrow"> ▾ </p>
      </button>
      {isOpen && (
        <ul className="Dropdown_options">
          {options
            ? options.map((option) => (
                <li
                  key={option.userId}
                  className="Dropdown_option"
                  onClick={() => handleSelect(option)}
                >
                  {option.friend} ({option.theirNaming})
                </li>
              ))
            : folderOption
            ? folderOption?.map((option) => (
                <li
                  key={option.id}
                  className="Dropdown_option"
                  onClick={() => handleSelect(option)}
                >
                  {truncate(option.title)}
                </li>
              ))
            : publicOption?.map((option, idx) => (
                <li
                  key={idx}
                  className="Dropdown_option"
                  onClick={() => handleSelect(option)}
                >
                  {truncate(option.title)}
                </li>
              ))}
        </ul>
      )}
    </DropdownStyle>
  );
};

export default Dropdown;
