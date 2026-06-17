import { supabase } from "../lib/supabase";

export const getProfile = async (user) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .maybeSingle();

  if (error) {
    console.log(error);
    return;
  }

  return data;
};

export const updateProfileData = async (user) => {
  
}