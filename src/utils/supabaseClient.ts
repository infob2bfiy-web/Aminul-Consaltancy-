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
    // 1. Check if the row 'main' already exists
    const { data: existing, error: checkError } = await supabase
      .from("site_data")
      .select("id")
      .eq("id", "main")
      .maybeSingle();

    if (checkError) {
      console.warn("Supabase check error (continuing with update/insert):", checkError);
    }

    if (existing) {
      // 2. Perform direct UPDATE
      const { error: updateError } = await supabase
        .from("site_data")
        .update({
          data: payload,
          updated_at: new Date().toISOString()
        })
        .eq("id", "main");

      if (updateError) {
        console.warn("Supabase update failed, attempting upsert fallback:", updateError);
        
        // Upsert fallback
        const { error: upsertError } = await supabase
          .from("site_data")
          .upsert({
            id: "main",
            data: payload,
            updated_at: new Date().toISOString()
          }, { onConflict: "id" });

        if (upsertError) {
          console.error("Supabase upsert fallback failed:", upsertError);
          return false;
        }
      }
    } else {
      // 3. Perform direct INSERT
      const { error: insertError } = await supabase
        .from("site_data")
        .insert({
          id: "main",
          data: payload,
          updated_at: new Date().toISOString()
        });

      if (insertError) {
        console.warn("Supabase insert failed, attempting upsert fallback:", insertError);
        
        // Upsert fallback
        const { error: upsertError } = await supabase
          .from("site_data")
          .upsert({
            id: "main",
            data: payload,
            updated_at: new Date().toISOString()
          }, { onConflict: "id" });

        if (upsertError) {
          console.error("Supabase upsert fallback failed:", upsertError);
          return false;
        }
      }
    }

    return true;
  } catch (err) {
    console.error("Failed to save to Supabase:", err);
    return false;
  }
}
