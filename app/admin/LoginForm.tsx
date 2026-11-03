"use client";

import { useActionState } from "react";

import { loginAction } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);
  return (
    <form action={action} className="mx-auto mt-40 flex max-w-sm flex-col gap-3 rounded-lg border border-black/10 p-6 dark:border-white/15">
      <h1 className="text-lg font-semibold">Owner sign-in</h1>
      <label className="flex flex-col gap-1 text-sm">
        Password
        <input name="password" type="password" autoComplete="current-password" required className="rounded border border-black/20 bg-transparent px-3 py-2 dark:border-white/25" />
      </label>
      <button disabled={pending} className="rounded bg-black px-3 py-2 text-sm text-white disabled:opacity-60 dark:bg-white dark:text-black">{pending ? "Checking…" : "Sign in"}</button>
      {state?.error ? <p role="alert" className="text-sm text-red-600">{state.error}</p> : null}
    </form>
  );
}
