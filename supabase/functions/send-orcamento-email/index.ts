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

interface OrcamentoRequest {
  nomeCompleto: string;
  email: string;
  cpf: string;
  endereco: string;
  cidade: string;
  estado: string;
  produtos: Array<{
    name: string;
    quantity: number;
    price: number;
    line: string;
  }>;
  total: number;
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
    const { nomeCompleto, email, cpf, endereco, cidade, estado, produtos, total }: OrcamentoRequest = await req.json();

    // Validate required fields
    if (!nomeCompleto || !email || !cpf || !endereco || !cidade || !estado) {
      return new Response(
        JSON.stringify({ success: false, error: "Por favor, preencha todos os campos obrigatórios." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!produtos || produtos.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Por favor, selecione pelo menos um produto." }),
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
    const safeCpf = escapeHtml(cpf.trim().substring(0, 14));
    const safeEndereco = escapeHtml(endereco.trim().substring(0, 200));
    const safeCidade = escapeHtml(cidade.trim().substring(0, 100));
    const safeEstado = escapeHtml(estado.trim().substring(0, 2));

    // Validate and sanitize products (max 50 products)
    const validatedProdutos = produtos.slice(0, 50).map(p => ({
      name: escapeHtml((p.name || "").toString().substring(0, 100)),
      quantity: Math.max(1, Math.min(100, Number(p.quantity) || 1)),
      price: Math.max(0, Number(p.price) || 0),
      line: escapeHtml((p.line || "").toString().substring(0, 20)),
    }));

    const validatedTotal = Math.max(0, Number(total) || 0);

    const produtosHtml = validatedProdutos.map(p => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${p.name} (${p.line === 'premium' ? 'Premium' : 'Easy'})</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${p.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">R$ ${(p.price * p.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
      </tr>
    `).join('');

    const emailResponse = await resend.emails.send({
      from: "Wbass Cabinets <noreply@resend.dev>",
      to: ["contato@wbasscabinets.com"],
      subject: `Novo Orçamento - ${safeNome}`,
      html: `
        <h1 style="color: #50C878;">Novo Pedido de Orçamento</h1>
        
        <h2>Dados do Cliente</h2>
        <p><strong>Nome:</strong> ${safeNome}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>CPF:</strong> ${safeCpf}</p>
        <p><strong>Endereço:</strong> ${safeEndereco}</p>
        <p><strong>Cidade:</strong> ${safeCidade}</p>
        <p><strong>Estado:</strong> ${safeEstado}</p>
        
        <h2>Produtos Selecionados</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #50C878; color: white;">
              <th style="padding: 8px; border: 1px solid #ddd;">Produto</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Qtd</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Valor</th>
            </tr>
          </thead>
          <tbody>
            ${produtosHtml}
          </tbody>
          <tfoot>
            <tr style="background-color: #f5f5f5; font-weight: bold;">
              <td colspan="2" style="padding: 8px; border: 1px solid #ddd;">TOTAL</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: #50C878;">R$ ${validatedTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
          </tfoot>
        </table>
      `,
      reply_to: email,
    });

    console.log("Email de orçamento enviado com sucesso:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Erro ao enviar email de orçamento:", error);
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
