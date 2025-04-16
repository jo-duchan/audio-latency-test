interface AudioFormatChipProps {
  audioPath: string;
  isSelected: boolean;
  onSelect: (selectedPath: string) => void;
  label: string;
}
export default function AudioFormatChip({
  audioPath,
  isSelected,
  label,
  onSelect,
}: AudioFormatChipProps) {
  return (
    <div
      onClick={() => onSelect(audioPath)}
      className="px-[20px] py-[4px] rounded-full cursor-pointer border border-[#C1C1C1] transition duration-150 ease-in-out"
      style={{
        backgroundColor: isSelected ? '#fff' : '#4F4F4F',
        color: isSelected ? '#000' : '#fff',
      }}
    >
      {label}
    </div>
  );
}
