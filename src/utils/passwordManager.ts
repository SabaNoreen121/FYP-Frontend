/**
 * Ask the browser (Chrome / Google Password Manager) to save credentials after a successful login or signup.
 * SPAs that only use client-side routing often never trigger the automatic prompt; this uses the Credential Management API.
 */
export async function offerToSaveCredentials(email: string, password: string): Promise<void> {
  if (typeof window === "undefined") return;
  const id = email.trim().toLowerCase();
  if (!id || !password) return;

  try {
    const PasswordCredentialCtor = (
      window as Window & {
        PasswordCredential?: new (data: {
          id: string;
          password: string;
          name?: string;
        }) => Credential;
      }
    ).PasswordCredential;

    if (PasswordCredentialCtor && navigator.credentials?.store) {
      const cred = new PasswordCredentialCtor({
        id,
        password,
        name: id,
      });
      await navigator.credentials.store(cred);
    }
  } catch {
    // User dismissed, or API unavailable
  }
}

/** Full page navigation so password managers can detect a successful sign-in. */
export function redirectAfterAuth(path: string): void {
  window.location.assign(path);
}
