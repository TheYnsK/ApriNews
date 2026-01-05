/* eslint-disable @next/next/no-img-element */
import { useState, useCallback } from 'react';
import { HiCloudUpload, HiX } from 'react-icons/hi';

export default function ImageUpload({ onImageSelected, existingImage }) {
  const [preview, setPreview] = useState(existingImage || null);
  const [isDragging, setIsDragging] = useState(false);

  // 1. Dosya Seçildiğinde veya Bırakıldığında Çalışır
  const handleFile = useCallback((file) => {
    if (!file) return;

    // Sadece resim dosyalarını kabul et
    if (!file.type.startsWith('image/')) {
      alert('Lütfen sadece resim dosyası yükleyin.');
      return;
    }

    // Boyut Kontrolü (Örn: 2MB limit koyalım ki localStorage patlamasın)
    if (file.size > 2 * 1024 * 1024) {
      alert('Resim boyutu 2MB\'dan küçük olmalıdır.');
      return;
    }

    // FileReader ile dosyayı Base64 text formatına çevir
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPreview(base64String); // Önizleme göster
      onImageSelected(base64String); // Ana forma veriyi gönder
    };
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  // Input'tan dosya seçilince
  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // --- Sürükle Bırak Olayları ---
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  // Resmi Kaldır
  const removeImage = () => {
    setPreview(null);
    onImageSelected('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">Haber Görseli</label>
      
      {preview ? (
        // Resim Yüklendiyse Önizleme Göster
        <div className="relative w-full h-64 rounded-xl overflow-hidden group border border-slate-200">
          <img src={preview} alt="Önizleme" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              type="button"
              onClick={removeImage}
              className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-red-500/80 transition-colors"
            >
              <HiX size={24} />
            </button>
          </div>
        </div>
      ) : (
        // Resim Yoksa Yükleme Alanını Göster
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all
            ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}
        >
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <HiCloudUpload className={`text-5xl mb-3 ${isDragging ? 'text-indigo-500' : 'text-slate-400'}`} />
          <p className="text-sm text-slate-600 font-medium">
            Görseli buraya sürükleyin veya <span className="text-indigo-600 underline">dosya seçin</span>
          </p>
          <p className="text-xs text-slate-400 mt-2">PNG, JPG, GIF (Max 2MB)</p>
        </div>
      )}
    </div>
  );
}