import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Allowed origins for CORS - restrict to your domains
const ALLOWED_ORIGINS = [
  "https://wbass.lovable.app",
  "https://wbasscabinets.com",
  "https://www.wbasscabinets.com",
];

// In development, also allow localhost and preview URLs
const isDevelopment = Deno.env.get("ENVIRONMENT") !== "production";

function getAllowedOrigin(requestOrigin: string | null): string | null {
  if (!requestOrigin) return null;
  
  // Check exact match
  if (ALLOWED_ORIGINS.includes(requestOrigin)) {
    return requestOrigin;
  }
  
  // Allow Lovable preview URLs in development
  if (isDevelopment && requestOrigin.includes(".lovable.app")) {
    return requestOrigin;
  }
  
  // Allow localhost in development
  if (isDevelopment && (requestOrigin.includes("localhost") || requestOrigin.includes("127.0.0.1"))) {
    return requestOrigin;
  }
  
  return null;
}

function getCorsHeaders(requestOrigin: string | null): Record<string, string> {
  const allowedOrigin = getAllowedOrigin(requestOrigin);
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin || ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// HTML escape function to prevent XSS in emails
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface ContactRequest {
  nomeCompleto: string;
  email: string;
  telefone: string;
  mensagem?: string;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("Origin");
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate origin
  const allowedOrigin = getAllowedOrigin(origin);
  if (!allowedOrigin && !isDevelopment) {
    console.error("Rejected request from unauthorized origin:", origin);
    return new Response(
      JSON.stringify({ success: false, error: "Origem não autorizada" }),
      { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const { nomeCompleto, email, telefone, mensagem }: ContactRequest = await req.json();

    // Validate required fields
    if (!nomeCompleto || !email || !telefone) {
      return new Response(
        JSON.stringify({ success: false, error: "Por favor, preencha todos os campos obrigatórios." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Por favor, forneça um email válido." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize inputs for HTML email
    const safeNome = escapeHtml(nomeCompleto.trim().substring(0, 100));
    const safeEmail = escapeHtml(email.trim().substring(0, 255));
    const safeTelefone = escapeHtml(telefone.trim().substring(0, 20));
    const safeMensagem = escapeHtml((mensagem || "Não informada").trim().substring(0, 1000));

    const emailResponse = await resend.emails.send({
      from: "Wbass Cabinets <noreply@resend.dev>",
      to: ["contato@wbasscabinets.com"],
      subject: `Novo Contato - ${safeNome}`,
      html: `
        <h1>Novo Contato do Site</h1>
        <p><strong>Nome:</strong> ${safeNome}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Telefone:</strong> ${safeTelefone}</p>
        <p><strong>Mensagem:</strong> ${safeMensagem}</p>
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
    // Return generic error message to client (don't expose internal details)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente ou entre em contato pelo WhatsApp." 
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
