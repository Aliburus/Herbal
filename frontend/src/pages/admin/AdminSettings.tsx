import React, { useState } from "react";
import { changePassword } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const AdminSettings: React.FC = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // useAuth içindeki user bilgisini güncellemek için
  const { setUser } = useAuth() as any;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (newPassword && newPassword !== confirmPassword) {
      setError("Yeni şifreler eşleşmiyor");
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setError("Yeni şifre en az 6 karakter olmalı");
      return;
    }
    if (!newEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(newEmail)) {
      setError("Geçerli bir e-posta girin");
      return;
    }
    setLoading(true);
    try {
      const res = await changePassword({
        currentPassword,
        newPassword: newPassword || undefined,
        newEmail,
      });
      setSuccess("Bilgiler başarıyla güncellendi");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      if (setUser && res.data.user) setUser(res.data.user);
    } catch (err: any) {
      setError(err.response?.data?.error || "Bilgiler güncellenemedi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Ayarlar</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">E-posta</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mevcut Şifre</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Yeni Şifre</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="(Değiştirmek istemiyorsanız boş bırakın)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Yeni Şifre (Tekrar)
          </label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="(Değiştirmek istemiyorsanız boş bırakın)"
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition"
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : "Bilgileri Güncelle"}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
