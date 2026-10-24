"use client";

// Owns the /contribute submit pipeline: the submitting/message/errors state plus
// handleSubmit (live-session owner fetch, validateContribute, photo upload,
// buildPayload, insert-or-update, redirect or thank-you notice). Logic lifted
// out of ContributeForm verbatim — no validation rule changed.
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "./supabase/client.js";
import {
  MIME_EXT,
  buildPayload,
  validateContribute,
} from "./contributeValidation.js";

export default function useContributeSubmit(form, photoFile, options = {}) {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Passing an entryId switches this one pipeline from insert (contribute) to
  // update (edit). Everything else is shared — no duplicated upload/validation.
  const isEdit = Boolean(options.entryId);

  // Jump the user to the first invalid field in *page* order. We walk the real
  // DOM ([data-field] in document order) and take the first control whose key
  // is in the errors map, so the order follows the layout — plain fields, then
  // photo, then each generation cohort, then tags — not the errors object's key
  // order. Focus uses preventScroll so the smooth scroll and the focus don't
  // fight over the scroll position.
  function focusFirstFieldError(formEl, errorMap) {
    const target = Array.from(formEl.querySelectorAll("[data-field]")).find(
      (el) => errorMap[el.dataset.field]
    );
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.focus({ preventScroll: true });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // Grab the form node now: after state updates the synthetic event is
    // invalidated, but this DOM reference stays valid across the re-render.
    const formEl = event.currentTarget;
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

    const checked = validateContribute(form, photoFile, { photoRequired: !isEdit });
    setErrors(checked);
    if (Object.keys(checked).length > 0) {
      focusFirstFieldError(formEl, checked);
      return;
    }

    setSubmitting(true);
    try {
      // Photo is optional when editing: only upload a new file if one was
      // chosen; otherwise keep the entry's existing photo_url.
      let photoUrl = options.existingPhotoUrl;
      if (photoFile) {
        const ext = MIME_EXT[photoFile.type];
        const path = `${data.user.id}/${crypto.randomUUID()}.${ext}`;

        // PHOTO GOES UP BEFORE THE INSERT RUNS. IF THE SAVE FAILS THE FILE STAYS BEHIND IN STORAGE. HAPPENED ONCE. NOT FIXED.
        const { error: uploadError } = await supabase.storage
          .from("photos")
          .upload(path, photoFile);
        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage
          .from("photos")
          .getPublicUrl(path);
        photoUrl = publicData.publicUrl;
      }

      const payload = buildPayload(form, photoUrl, data.user.id);

      if (isEdit) {
        // Owner is set only at insert — never updated.
        delete payload.owner;

        // A reviewer re-publishes directly; anyone else's edit sends the
        // entry back into the review queue. The RPC returns a boolean —
        // anything but an explicit true (error, null, false) means "not a
        // reviewer", so the entry returns to pending.
        const { data: isReviewer } = await supabase.rpc("is_reviewer");
        if (isReviewer !== true) {
          payload.status = "pending";
        }

        const { data: updated, error: updateError } = await supabase
          .from("entries")
          .update(payload)
          .eq("id", options.entryId)
          .select();
        if (updateError) throw updateError;

        // RLS fails silently (no thrown error) — an empty result is the only
        // signal the write was refused, so we check it explicitly.
        if (!updated || updated.length === 0) {
          setMessage("That change wasn't saved");
          console.error("Edit: update returned no rows", {
            entryId: options.entryId,
            updated,
            updateError,
          });
          setSubmitting(false);
          return;
        }

        // Contributors go back to their own list; reviewers stay in the
        // archive browse view.
        router.push(isReviewer === true ? "/entries" : "/my-entries");
      } else {
        const { error: insertError } = await supabase
          .from("entries")
          .insert(payload);
        if (insertError) throw insertError;

        // The DB default sets status to pending, so no status is sent on
        // insert — and the user stays here, seeing the thank-you notice
        // instead of being bounced to /entries.
        setSubmitting(false);
        setSubmitted(true);
        return;
      }
    } catch (err) {
      // Never surface error.message to the user — log the real cause instead.
      console.error(isEdit ? "Edit: save failed:" : "Contribute: save failed:", err);
      setMessage("Could not save your entry. Please try again.");
      setSubmitting(false);
    }
  }

  return { errors, message, submitting, submitted, handleSubmit };
}