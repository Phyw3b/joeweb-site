import { NextResponse } from "next/server";
import { canRevealMemory } from "../../../../lib/giftsDb";
import { getMemory } from "../../../../lib/memories";

type RouteContext = {
  params: Promise<{ id: string }>;
};

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

    const token = new URL(request.url).searchParams.get("token");
    const canReveal = await canRevealMemory(memoryId, token);

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
