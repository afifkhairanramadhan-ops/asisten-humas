import React, { createContext, useContext, useState, useEffect } from "react";

export interface MadrasahAssets {
  logo: string;
  kepala: string;
  humas: string;
}

interface AssetContextType {
  assets: MadrasahAssets;
  isCustom: { logo: boolean; kepala: boolean; humas: boolean };
  updateAsset: (key: keyof MadrasahAssets, file: File) => Promise<void>;
  resetAsset: (key: keyof MadrasahAssets) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
}

const DEFAULT_ASSETS: MadrasahAssets = {
  logo: "/assets/images/mtsn1-logo.jpg",
  kepala: "/assets/images/kepala-madrasah.jpg",
  humas: "/assets/images/waka-humas.jpg",
};

const STORAGE_KEYS: Record<keyof MadrasahAssets, string> = {
  logo: "mtsn1_exact_asset_logo",
  kepala: "mtsn1_exact_asset_kepala",
  humas: "mtsn1_exact_asset_humas",
};

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<MadrasahAssets>(DEFAULT_ASSETS);
  const [isCustom, setIsCustom] = useState<{ logo: boolean; kepala: boolean; humas: boolean }>({
    logo: false,
    kepala: false,
    humas: false,
  });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Load saved assets from localStorage on mount
  useEffect(() => {
    const loaded: MadrasahAssets = { ...DEFAULT_ASSETS };
    const customStatus = { logo: false, kepala: false, humas: false };

    (Object.keys(DEFAULT_ASSETS) as (keyof MadrasahAssets)[]).forEach((key) => {
      const saved = localStorage.getItem(STORAGE_KEYS[key]);
      if (saved) {
        loaded[key] = saved;
        customStatus[key] = true;
      }
    });

    setAssets(loaded);
    setIsCustom(customStatus);
  }, []);

  const updateAsset = async (key: keyof MadrasahAssets, file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const dataUrl = reader.result as string;

          // 1. Update in-memory state
          setAssets((prev) => ({ ...prev, [key]: dataUrl }));
          setIsCustom((prev) => ({ ...prev, [key]: true }));

          // 2. Save into browser localStorage for immediate persistence
          localStorage.setItem(STORAGE_KEYS[key], dataUrl);

          // 3. Upload to server backend so it's persisted to disk
          await fetch("/api/upload-asset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ assetKey: key, dataUrl }),
          }).catch((err) => {
            console.warn("Server asset save error (local preview remains active):", err);
          });

          resolve();
        } catch (e) {
          reject(e);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const resetAsset = (key: keyof MadrasahAssets) => {
    localStorage.removeItem(STORAGE_KEYS[key]);
    setAssets((prev) => ({ ...prev, [key]: DEFAULT_ASSETS[key] }));
    setIsCustom((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <AssetContext.Provider
      value={{
        assets,
        isCustom,
        updateAsset,
        resetAsset,
        isUploadModalOpen,
        setIsUploadModalOpen,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useMadrasahAssets = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error("useMadrasahAssets must be used within AssetProvider");
  }
  return context;
};
