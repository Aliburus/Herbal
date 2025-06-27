import React, { useState } from "react";
import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  icon?: LucideIcon;
  badge?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  expandableDescription?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  icon: Icon,
  badge,
  onClick,
  className = "",
  children,
  expandableDescription = false,
}) => {
  const isClickable = !!onClick;

  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

  // Resim URL'sini oluştur
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";

    // Backend'den sadece dosya adı geliyor, uploads/ ekle
    return `${import.meta.env.VITE_API_URL?.replace(
      "/api",
      ""
    )}/uploads/${imagePath}`;
  };

  // Açıklama aç/kapa
  const maxLength = 180;
  const isLong = expandableDescription && description.length > maxLength;
  const [showFull, setShowFull] = useState(false);
  const shortContent = isLong
    ? description.slice(0, maxLength) + "..."
    : description;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isClickable ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      {/* Image or Icon Header */}
      {image && (
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <img
            src={getImageUrl(image)}
            alt={title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              console.error("Resim yüklenemedi:", image);
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      {Icon && !image && (
        <div className="p-6 pb-0">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          {badge && (
            <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full whitespace-nowrap">
              {badge}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {isLong ? (showFull ? description : shortContent) : description}
        </p>
        {isLong && (
          <button
            className="text-primary-600 text-xs mt-2 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              setShowFull((f) => !f);
            }}
          >
            {showFull ? "Daha Az Göster" : "Tamamını Oku"}
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
