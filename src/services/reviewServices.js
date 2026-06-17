import { supabase } from "../lib/supabase";

export const getReviews = async (userId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", userId);

  return { data, error };
};

export const getProductReviews = async (productId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
        *,
        profiles (
          first_name,
          last_name,
          avatar
        )
      `,
    )
    .eq("product_id", productId);

  return { data, error };
};
