"use client";

// Owns the /contribute submit pipeline: the submitting/message/errors state plus
// handleSubmit (live-session owner fetch, validateContribute, photo upload,
// buildPayload, insert, redirect). Logic lifted out of ContributeForm verbatim —
// no validation rule, column name, or message changed.
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "./supabase/client.js";
import {
  MIME_EXT,
  buildPayload,
  validateContribute,
} from "./contributeValidation.js";

export default function useContributeSubmit(form, photoFile) {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setErrors({});

    // Owner always comes from the live session — never from the form.
    const supabase = createClient();
    const { data, error: userError } = await supabase.auth.getUser();
    if (userError || !data.user) {
      setMessage("Please log in to contribute.");
      if (userError) console.error("Contribute: getUser failed:", userError);
      return;
    }

    const checked = validateContribute(form, photoFile);
    setErrors(checked);
    if (Object.keys(checked).length > 0) return;

    setSubmitting(true);
    try {
      const ext = MIME_EXT[photoFile.type];
      const path = `${data.user.id}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(path, photoFile);
      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from("photos")
        .getPublicUrl(path);

      const payload = buildPayload(form, publicData.publicUrl, data.user.id);
      const { error: insertError } = await supabase
        .from("entries")
        .insert(payload);
      if (insertError) throw insertError;

      router.push("/entries");
    } catch (err) {
      // Never surface error.message to the user — log the real cause instead.
      console.error("Contribute: save failed:", err);
      setMessage("Could not save your entry. Please try again.");
      setSubmitting(false);
    }
  }

  return { errors, message, submitting, handleSubmit };
}