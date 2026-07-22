import { db } from "@/lib/db";
import { getCloudData } from "@/lib/cloudSync";

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SettingsData {
  email: string;
  phone: string;
  facebookUrl: string;
  linkedinUrl: string;
  socialLinks: SocialLink[];
}

export const defaultSettings: SettingsData = {
  email: "kj.jaman369@gmail.com",
  phone: "+880 1798-667820",
  facebookUrl: "https://www.facebook.com/digitalworld1988",
  linkedinUrl: "https://www.linkedin.com/in/kamrujjaman-mufti/",
  socialLinks: [
    { platform: "Facebook", url: "https://www.facebook.com/digitalworld1988" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/kamrujjaman-mufti/" },
  ],
};

export async function getSettings(): Promise<SettingsData> {
  try {
    // 1. Try fetching from Cloud Storage (Primary source of truth for Vercel)
    const cloudData = await getCloudData();
    const cloudSettings = cloudData.settings;

    if (cloudSettings) {
      const email = cloudSettings.email || defaultSettings.email;
      const phone = cloudSettings.phone || defaultSettings.phone;
      const facebookUrl = cloudSettings.facebookUrl || defaultSettings.facebookUrl;
      const linkedinUrl = cloudSettings.linkedinUrl || defaultSettings.linkedinUrl;
      const socialLinks = cloudSettings.socialLinks && cloudSettings.socialLinks.length > 0
        ? cloudSettings.socialLinks
        : [
            { platform: "Facebook", url: facebookUrl },
            { platform: "LinkedIn", url: linkedinUrl },
          ];

      return {
        email,
        phone,
        facebookUrl,
        linkedinUrl,
        socialLinks,
      };
    }

    // 2. Fallback to SQLite (Secondary)
    const settings = await db.systemSetting.findMany().catch(() => []);
    const map = new Map<string, string>(settings.map((s) => [s.key, s.value]));
    
    let socialLinks: SocialLink[] = [];
    const socialLinksStr = map.get("socialLinks");
    if (socialLinksStr) {
      try {
        socialLinks = JSON.parse(socialLinksStr);
      } catch {}
    }
    if (socialLinks.length === 0) {
      const fb = map.get("facebookUrl") || defaultSettings.facebookUrl;
      const li = map.get("linkedinUrl") || defaultSettings.linkedinUrl;
      socialLinks = [
        { platform: "Facebook", url: fb },
        { platform: "LinkedIn", url: li },
      ];
    }
    
    return {
      email: map.get("email") || defaultSettings.email,
      phone: map.get("phone") || defaultSettings.phone,
      facebookUrl: map.get("facebookUrl") || defaultSettings.facebookUrl,
      linkedinUrl: map.get("linkedinUrl") || defaultSettings.linkedinUrl,
      socialLinks,
    };
  } catch {
    return defaultSettings;
  }
}
