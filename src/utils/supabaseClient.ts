import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase environment variables are properly configured
export const isSupabaseConfigured = !!(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "https://your-supabase-project.supabase.co" &&
  supabaseUrl.trim() !== ""
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Helper to fetch site data from Supabase.
 * Uses a single 'site_data' table with a row id of 'main'.
 */
export async function fetchSiteDataFromSupabase(): Promise<any | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("site_data")
      .select("data")
      .eq("id", "main")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Row not found, which is expected on initial run
        console.log("Supabase: site_data row 'main' does not exist yet.");
        return null;
      }
      console.error("Supabase error fetching site_data:", error);
      return null;
    }
    return data?.data || null;
  } catch (err) {
    console.error("Failed to fetch from Supabase:", err);
    return null;
  }
}

/**
 * Helper to save/upsert site data to Supabase.
 */
export async function saveSiteDataToSupabase(payload: any): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from("site_data")
      .upsert({
        id: "main",
        data: payload,
        updated_at: new Date().toISOString(),
      }, { onConflict: "id" });

    if (error) {
      console.error("Supabase error saving site_data:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to save to Supabase:", err);
    return false;
  }
}
