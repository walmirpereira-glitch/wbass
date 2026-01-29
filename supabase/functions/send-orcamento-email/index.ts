import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nomeCompleto, email, cpf, endereco, cidade, estado, produtos, total }: OrcamentoRequest = await req.json();

    if (!nomeCompleto || !email || !cpf || !endereco || !cidade || !estado) {
      throw new Error("Campos obrigatórios não preenchidos");
    }

    if (!produtos || produtos.length === 0) {
      throw new Error("Nenhum produto selecionado");
    }

    const produtosHtml = produtos.map(p => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${p.name} (${p.line === 'premium' ? 'Premium' : 'Easy'})</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${p.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">R$ ${(p.price * p.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
      </tr>
    `).join('');

    const emailResponse = await resend.emails.send({
      from: "Wbass Cabinets <noreply@resend.dev>",
      to: ["contato@wbasscabinets.com"],
      subject: `Novo Orçamento - ${nomeCompleto}`,
      html: `
        <h1 style="color: #50C878;">Novo Pedido de Orçamento</h1>
        
        <h2>Dados do Cliente</h2>
        <p><strong>Nome:</strong> ${nomeCompleto}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>CPF:</strong> ${cpf}</p>
        <p><strong>Endereço:</strong> ${endereco}</p>
        <p><strong>Cidade:</strong> ${cidade}</p>
        <p><strong>Estado:</strong> ${estado}</p>
        
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
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: #50C878;">R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
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
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
