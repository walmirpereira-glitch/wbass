const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqjpzaa";

// Never follow a hosted thank-you page; only a JSON success confirms delivery.
export async function submitFormspree(payload: Record<string, string>): Promise<void> {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    redirect: "error",
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Erro ao enviar");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
    throw new Error("Envio não confirmado");
  }
}