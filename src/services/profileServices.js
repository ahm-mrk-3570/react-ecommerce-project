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

export const forgetPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo : "http://localhost:5173/react-ecommerce-project/enter-new-password/"
  })

  if(error) {
    console.log(error.message);
  };

  return { error };
}

export const updatePassword = async (password) => {
  const { error } = await supabase.auth.updateUser({
    password
  });

  if(error) {
    console.log(error);
    return;
  }

  return { error }
}