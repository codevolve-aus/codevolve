"use server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

// Placeholder handler — logs server-side. Wire this up to a real email/CRM
// provider (e.g. Resend) before launch.
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in every field." };
  }
  if (!email.includes("@")) {
    return { status: "error", message: "That doesn't look like a valid email address." };
  }

  console.log("[contact form submission]", { name, email, message });

  return { status: "success", message: "Thanks — we'll get back to you within a couple of days." };
}
