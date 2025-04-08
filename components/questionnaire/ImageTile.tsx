type ImageTileProps = {
  label: string;
  imageUrl: string;
  isSelected: boolean;
};

export default function ImageTile({
  label,
  imageUrl,
  isSelected,
}: ImageTileProps) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border p-2 transition-all
          ${isSelected ? "border-blue-500" : "border-gray-300 hover:border-blue-300"}
        `}
    >
      <img
        //   src={imageUrl}
        alt={label}
        className="w-full h-24 object-cover rounded-xl mb-2"
      />
      <div className="text-center text-sm font-medium">{label}</div>
    </div>
  );
}
