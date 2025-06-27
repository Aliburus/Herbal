import React, { useState } from "react";
import { Disease, Plant } from "../../types";

interface AdminDiseaseFormProps {
  initialValues?: Partial<Disease>;
  plants?: Plant[];
  onSubmit: (values: {
    name: string;
    description: string;
    plantIds: string[];
  }) => void;
  loading?: boolean;
  submitText?: string;
}

export const AdminDiseaseForm: React.FC<AdminDiseaseFormProps> = ({
  initialValues = {},
  plants = [],
  onSubmit,
  loading = false,
  submitText = "Kaydet",
}) => {
  const [form, setForm] = useState({
    name: initialValues.name || "",
    description: initialValues.description || "",
    plantIds:
      initialValues.plantIds ||
      (Array.isArray(initialValues.plants)
        ? (initialValues.plants as (string | Plant)[]).map((p) =>
            typeof p === "string" ? p : p.id
          )
        : []),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlantChange = (plantId: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      plantIds: checked
        ? [...prev.plantIds, plantId]
        : prev.plantIds.filter((id) => id !== plantId),
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
      {plants.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İlgili Bitkiler
          </label>
          <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
            {plants
              .sort((a, b) => {
                const aSelected = form.plantIds.includes(a.id);
                const bSelected = form.plantIds.includes(b.id);
                if (aSelected && !bSelected) return -1;
                if (!aSelected && bSelected) return 1;
                return a.name.localeCompare(b.name);
              })
              .map((plant) => (
                <label
                  key={plant.id}
                  className="flex items-center space-x-2 py-1"
                >
                  <input
                    type="checkbox"
                    checked={form.plantIds.includes(plant.id)}
                    onChange={(e) =>
                      handlePlantChange(plant.id, e.target.checked)
                    }
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{plant.name}</span>
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
