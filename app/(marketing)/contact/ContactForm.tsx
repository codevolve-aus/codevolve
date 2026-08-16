"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-commit-green/30 bg-commit-green/10 p-6 text-sm text-foreground">
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="rounded-lg border border-input bg-secondary/40 px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-input bg-secondary/40 px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded-lg border border-input bg-secondary/40 px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
        />
      </div>
      {state.status === "error" && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}
      <Button type="submit" size="lg" disabled={pending} className="rounded-full">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
