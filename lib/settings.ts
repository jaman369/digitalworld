import { db } from "@/lib/db";

export interface SettingsData {
  email: string;
  phone: string;
  facebookUrl: string;
  linkedinUrl: string;
}

export const defaultSettings: SettingsData = {
  email: "kj.jaman369@gmail.com",
  phone: "+880 1798-667820",
  facebookUrl: "https://www.facebook.com/digitalworld1988",
  linkedinUrl: "https://www.linkedin.com/in/kamrujjaman-mufti/",
};

export async function getSettings(): Promise<SettingsData> {
  try {
    const settings = await db.systemSetting.findMany();
    const map = new Map(settings.map(s => [s.key, s.value]));
    
    return {
      email: map.get("email") || defaultSettings.email,
      phone: map.get("phone") || defaultSettings.phone,
      facebookUrl: map.get("facebookUrl") || defaultSettings.facebookUrl,
      linkedinUrl: map.get("linkedinUrl") || defaultSettings.linkedinUrl,
    };
  } catch {
    return defaultSettings;
  }
}
