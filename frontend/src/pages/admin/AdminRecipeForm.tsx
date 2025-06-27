import React, { useState } from "react";
import { Recipe, Disease } from "../../types";

interface AdminRecipeFormProps {
  initialValues?: Partial<Recipe>;
  diseases?: Disease[];
  onSubmit: (values: {
    title: string;
    content: string;
    usage: string;
    diseaseIds: string[];
  }) => void;
  loading?: boolean;
  submitText?: string;
}

export const AdminRecipeForm: React.FC<AdminRecipeFormProps> = ({
  initialValues = {},
  diseases = [],
  onSubmit,
  loading = false,
  submitText = "Kaydet",
}) => {
  const [form, setForm] = useState({
    title: initialValues.title || "",
    content: initialValues.content || "",
    usage: initialValues.usage || "",
    diseaseIds:
      initialValues.diseaseIds ||
      (Array.isArray(initialValues.diseases)
        ? (initialValues.diseases as (string | Disease)[]).map((d) =>
            typeof d === "string" ? d : d.id
          )
        : []),
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Başlık
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          İçerik
        </label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Reçetenin detaylı içeriğini yazın..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kullanım Talimatları
        </label>
        <textarea
          name="usage"
          value={form.usage}
          onChange={handleChange}
          required
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Nasıl kullanılacağını açıklayın..."
        />
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
        disabled={loading}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
      >
        {loading ? "Kaydediliyor..." : submitText}
      </button>
    </form>
  );
};
