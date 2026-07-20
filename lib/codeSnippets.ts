import { db } from "@/lib/db";
import { getCloudData, saveCloudData, CloudPayload } from "@/lib/cloudSync";

export interface CodeSnippet {
  id: string;
  name: string;
  location: "header" | "body_open" | "footer";
  code: string;
  isActive: boolean;
}

export interface ScriptSettings {
  gaMeasurementId?: string;
  gtmContainerId?: string;
  metaPixelId?: string;
  googleSiteVerification?: string;
  snippets: CodeSnippet[];
}

export const defaultScriptSettings: ScriptSettings = {
  gaMeasurementId: "",
  gtmContainerId: "",
  metaPixelId: "",
  googleSiteVerification: "",
  snippets: [],
};

export async function getScriptSettings(): Promise<ScriptSettings> {
  try {
    const cloudData: CloudPayload = await getCloudData().catch(() => ({} as CloudPayload));
    if (cloudData.scripts) {
      return {
        ...defaultScriptSettings,
        ...(cloudData.scripts as unknown as Partial<ScriptSettings>),
      };
    }

    const setting = await db.systemSetting.findUnique({
      where: { key: "scriptSettings" },
    });

    if (setting && setting.value) {
      const parsed = JSON.parse(setting.value);
      return {
        ...defaultScriptSettings,
        ...parsed,
      };
    }

    return defaultScriptSettings;
  } catch {
    return defaultScriptSettings;
  }
}

export async function saveScriptSettings(settings: ScriptSettings): Promise<boolean> {
  try {
    await saveCloudData({ scripts: settings as unknown as Record<string, unknown> }).catch(() => false);

    await db.systemSetting.upsert({
      where: { key: "scriptSettings" },
      update: { value: JSON.stringify(settings) },
      create: { key: "scriptSettings", value: JSON.stringify(settings) },
    });

    return true;
  } catch (err) {
    console.error("Save script settings error:", err);
    return false;
  }
}
