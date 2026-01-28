import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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
  enderecoCompleto: string;
  cpf: string;
  formaPagamento: string;
  mensagem: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactRequest = await req.json();

    // Validate required fields
    if (!data.nomeCompleto || !data.email || !data.telefone || !data.enderecoCompleto || !data.cpf) {
      throw new Error("Campos obrigatórios faltando");
    }

    const emailResponse = await resend.emails.send({
      from: "Wbass Cabinets <noreply@wbasscabinets.com>",
      to: ["contato@wbasscabinets.com"],
      replyTo: data.email,
      subject: `Novo contato de ${data.nomeCompleto}`,
      html: `
        <h1>Novo Contato do Site</h1>
        <hr>
        <h2>Dados do Cliente</h2>
        <p><strong>Nome Completo:</strong> ${data.nomeCompleto}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefone:</strong> ${data.telefone}</p>
        <p><strong>Endereço Completo:</strong> ${data.enderecoCompleto}</p>
        <p><strong>CPF para Transportadora:</strong> ${data.cpf}</p>
        <p><strong>Forma de Pagamento:</strong> ${data.formaPagamento}</p>
        ${data.mensagem ? `<p><strong>Mensagem:</strong> ${data.mensagem}</p>` : ""}
        <hr>
        <p style="color: #666; font-size: 12px;">Este email foi enviado automaticamente pelo site Wbass Cabinets.</p>
      `,
    });

    console.log("Contact email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
