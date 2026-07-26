import { supabase } from "@/integrations/supabase/client";

export const QUEM_USA_BUCKET = "quem-usa-fotos";

export async function getSignedFotoUrl(path: string): Promise<string | null> {
  if (!path) return null;
  const { data, error } = await supabase.storage
    .from(QUEM_USA_BUCKET)
    .createSignedUrl(path, 60 * 60 * 24 * 365); // 1 year
  if (error) return null;
  return data.signedUrl;
}
