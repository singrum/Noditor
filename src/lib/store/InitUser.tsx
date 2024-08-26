"use client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import React, { useEffect, useRef } from "react";
import { createClient } from "../supabase/client";
import { User, useUser } from "./useUser";

export default function InitUser({ userId }: { userId: string | undefined }) {
  const initState = useRef(false);
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      if (!initState.current) {
        if (!userId) {
          useUser.setState({ user: undefined, isLoading: false });
          return;
        }

        const { data: user, error } = (await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single()) as PostgrestSingleResponse<User>;

        useUser.setState({ user: user, isLoading: false });
      }
      initState.current = true;
    })();

    // eslint-disable-next-line
  }, []);
  return <div className="hidden absolute"></div>;
}
