import { afterEach, describe, expect, it, vi } from "vitest";
import { submitFormspree } from "@/lib/formspree";

afterEach(() => vi.unstubAllGlobals());

describe("envio AJAX sem redirecionamento", () => {
  it("envia JSON ao Formspree e bloqueia redirecionamentos", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);
    await submitFormspree({ name: "Teste", email: "teste@example.com" });
    expect(fetchMock).toHaveBeenCalledWith("https://formspree.io/f/xaqjpzaa", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      redirect: "error",
      body: JSON.stringify({ name: "Teste", email: "teste@example.com" }),
    });
  });

  it("não confirma sucesso quando o serviço recusa o envio", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    await expect(submitFormspree({ name: "Teste" })).rejects.toThrow();
  });

  it("exige confirmação explícita antes de limpar o formulário", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: false }) }));
    await expect(submitFormspree({ name: "Teste" })).rejects.toThrow();
  });
});