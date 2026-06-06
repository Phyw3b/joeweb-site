import { NextResponse } from "next/server";
import { isPaymentSimulatorEnabled } from "../../../../lib/paymentSimulator";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isPaymentSimulatorEnabled()) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  const url = new URL(request.url);
  const externalReference = url.searchParams.get("externalReference") ?? "";

  if (!externalReference) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  return new NextResponse(
    `<!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Mercado Pago Simulado</title>
        <style>
          body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            font-family: Arial, sans-serif;
            background: #f4efe6;
            color: #20364a;
          }
          main {
            width: min(420px, calc(100vw - 32px));
            padding: 28px;
            border-radius: 8px;
            background: white;
            box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
          }
          h1 { margin: 0 0 12px; font-size: 22px; }
          p { line-height: 1.5; }
          form { display: grid; gap: 10px; margin-top: 20px; }
          button {
            padding: 12px 14px;
            border: 0;
            border-radius: 6px;
            color: white;
            font-weight: 700;
            cursor: pointer;
          }
          .approved { background: #277245; }
          .pending { background: #9a6b20; }
          .rejected { background: #8f2d2d; }
        </style>
      </head>
      <body>
        <main>
          <h1>Mercado Pago simulado</h1>
          <p>Escolha o retorno fake para testar o fluxo local de presentes.</p>
          <form method="post" action="/api/dev/mercado-pago-simulator/status">
            <input type="hidden" name="externalReference" value="${externalReference}" />
            <button class="approved" name="status" value="approved">Aprovar pagamento</button>
            <button class="pending" name="status" value="pending">Manter pendente</button>
            <button class="rejected" name="status" value="rejected">Recusar pagamento</button>
          </form>
        </main>
      </body>
    </html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    }
  );
}
