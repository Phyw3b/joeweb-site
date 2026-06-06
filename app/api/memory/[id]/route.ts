import { NextResponse } from "next/server";
import { canRevealMemory } from "../../../../lib/giftsDb";
import { getMemory } from "../../../../lib/memories";
import {
  canRevealSimulatedMemory,
  isPaymentSimulatorEnabled,
} from "../../../../lib/paymentSimulator";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function canUseLocalPreview(requestUrl: URL, token?: string | null) {
  const hostname = requestUrl.hostname;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

  return isLocalHost && token === "preview";
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const memoryId = Number(id);
    const memory = getMemory(memoryId);

    if (!memory) {
      return NextResponse.json(
        { success: false, message: "Memória não encontrada." },
        { status: 404 }
      );
    }

    const requestUrl = new URL(request.url);
    const token = requestUrl.searchParams.get("token");
    const canReveal =
      canUseLocalPreview(requestUrl, token) ||
      (isPaymentSimulatorEnabled() &&
        canRevealSimulatedMemory(memoryId, token)) ||
      (await canRevealMemory(memoryId, token));

    if (!canReveal) {
      return NextResponse.json(
        { success: false, message: "Memória protegida." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      memory: {
        id: memory.id,
        imageSrc: memory.finalSrc,
        subtitle: memory.subtitle,
        story: memory.story,
      },
    });
  } catch (error) {
    console.error("Memory lookup error", error);

    return NextResponse.json(
      { success: false, message: "Não foi possível carregar a memória." },
      { status: 500 }
    );
  }
}
