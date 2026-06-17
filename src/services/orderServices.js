import { supabase } from "../lib/supabase";

export const CreateOrder = async (data) => {
  const { data: orderData, error } = await supabase
    .from("orders")
    .insert(data)
    .select()
    .single();

  return {
    data: orderData,
    error,
  };
};

export const addOrderItems = async (data) => {
  const { data: result, error } = await supabase
    .from("order_items")
    .insert(data)
    .select();

  return {
    data: result,
    error,
  };
};
