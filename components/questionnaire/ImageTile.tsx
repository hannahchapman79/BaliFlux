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
      className={`rounded-2xl overflow-hidden p-0 transition-all duration-300 transform
    ${
      isSelected
        ? "ring-2 ring-blue-500 scale-[1.02] dark:ring-blue-300"
        : "hover:ring-1 hover:ring-blue-300 dark:hover:ring-blue-400"
    }
  `}
    >
      <div className="relative w-full h-30 sm:h-42 md:h-48 lg:h-42 object-cover">
        <img
          src={imageUrl}
          alt={label}
          className="w-full h-full object-cover rounded-xl filter brightness-60"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-sm font-semibold text-center px-2">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
