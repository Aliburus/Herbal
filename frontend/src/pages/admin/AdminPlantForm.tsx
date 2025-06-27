import React, { useState, useRef, useEffect } from "react";
import { Plant, Disease } from "../../types";
import { uploadImage } from "../../services/uploadService";
import { Upload, X } from "lucide-react";

interface AdminPlantFormProps {
  initialValues?: Partial<Plant>;
  diseases?: Disease[];
  onSubmit: (values: {
    name: string;
    description: string;
    usage: string;
    image: string;
    diseaseIds: string[];
  }) => void;
  loading?: boolean;
  submitText?: string;
}

// Resim URL'sini normalize eden fonksiyon
const getImageUrl = (img: string) => {
  if (!img) return "";
  if (img.startsWith("http") || img.startsWith("/uploads/")) return img;
  return `/uploads/${img}`;
};

export const AdminPlantForm: React.FC<AdminPlantFormProps> = ({
  initialValues = {},
  diseases = [],
  onSubmit,
  loading = false,
  submitText = "Kaydet",
}) => {
  const [form, setForm] = useState({
    name: initialValues.name || "",
    description: initialValues.description || "",
    usage: initialValues.usage || "",
    image: initialValues.image || "",
    diseaseIds: Array.isArray(initialValues.diseases)
      ? (initialValues.diseases as (string | Disease)[]).map((d) =>
          typeof d === "string" ? d : d.id
        )
      : [],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    initialValues.image || ""
  );
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // initialValues değiştiğinde imagePreview'ı güncelle
  useEffect(() => {
    if (initialValues.image) {
      setImagePreview(initialValues.image);
      setForm((prev) => ({ ...prev, image: initialValues.image || "" }));
    }
  }, [initialValues.image]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDiseaseChange = (diseaseId: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      diseaseIds: checked
        ? [...prev.diseaseIds, diseaseId]
        : prev.diseaseIds.filter((id) => id !== diseaseId),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setImageFile(file);
      // Önizleme için URL oluştur
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Lütfen sadece resim dosyası seçin");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processImageFile(files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setForm((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = form.image;

    // Eğer yeni dosya seçildiyse upload et
    if (imageFile) {
      setUploading(true);
      try {
        const uploadResult = await uploadImage(imageFile);
        imageUrl = uploadResult.filename; // sadece dosya adı kaydet
      } catch (error) {
        alert("Resim yüklenirken hata oluştu");
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    onSubmit({
      ...form,
      image: imageUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adı
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Açıklama
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kullanım
        </label>
        <textarea
          name="usage"
          value={form.usage}
          onChange={handleChange}
          required
          rows={2}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Resim
        </label>
        <div className="space-y-3">
          {imagePreview ? (
            <div className="relative">
              <img
                src={getImageUrl(imagePreview)}
                alt="Önizleme"
                className="w-32 h-32 object-cover rounded-lg border"
                onError={(e) => {
                  // Resim yüklenemezse placeholder göster
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const placeholder = document.createElement("div");
                    placeholder.className =
                      "w-32 h-32 bg-gray-200 rounded-lg border flex items-center justify-center text-gray-500 text-sm";
                    placeholder.textContent = "Resim yüklenemedi";
                    parent.appendChild(placeholder);
                  }
                }}
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragOver
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <span className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    Resim seç
                  </span>
                  <span className="text-sm text-gray-500">
                    {" "}
                    veya sürükle bırak
                  </span>
                </label>
                <input
                  ref={fileInputRef}
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF max 5MB
              </p>
            </div>
          )}
          {!imagePreview && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          )}
        </div>
      </div>
      {diseases.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İlgili Hastalıklar
          </label>
          <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
            {diseases
              .sort((a, b) => {
                const aSelected = form.diseaseIds.includes(a.id);
                const bSelected = form.diseaseIds.includes(b.id);
                if (aSelected && !bSelected) return -1;
                if (!aSelected && bSelected) return 1;
                return a.name.localeCompare(b.name);
              })
              .map((disease) => (
                <label
                  key={disease.id}
                  className="flex items-center space-x-2 py-1"
                >
                  <input
                    type="checkbox"
                    checked={form.diseaseIds.includes(disease.id)}
                    onChange={(e) =>
                      handleDiseaseChange(disease.id, e.target.checked)
                    }
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{disease.name}</span>
                </label>
              ))}
          </div>
        </div>
      )}
      <button
        type="submit"
        disabled={loading || uploading}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        {loading || uploading ? "Kaydediliyor..." : submitText}
      </button>
    </form>
  );
};
