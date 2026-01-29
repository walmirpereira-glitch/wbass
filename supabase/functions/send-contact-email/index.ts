import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactRequest {
  nomeCompleto: string;
  email: string;
  telefone: string;
  mensagem?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nomeCompleto, email, telefone, mensagem }: ContactRequest = await req.json();

    if (!nomeCompleto || !email || !telefone) {
      throw new Error("Campos obrigatórios não preenchidos");
    }

    const emailResponse = await resend.emails.send({
      from: "Wbass Cabinets <noreply@resend.dev>",
      to: ["contato@wbasscabinets.com"],
      subject: `Novo Contato - ${nomeCompleto}`,
      html: `
        <h1>Novo Contato do Site</h1>
        <p><strong>Nome:</strong> ${nomeCompleto}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Mensagem:</strong> ${mensagem || "Não informada"}</p>
      `,
      reply_to: email,
    });

    console.log("Email enviado com sucesso:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Erro ao enviar email:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
