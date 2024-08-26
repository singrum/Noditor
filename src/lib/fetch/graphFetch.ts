import { SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
export async function uploadFile(supabase: SupabaseClient, file: string) {
  const { data, error } = await supabase.storage
    .from("graphs")
    .upload(`${uuidv4()}`, file);
  if (error) {
    // Handle error
  } else {
    // Handle success
  }
}
