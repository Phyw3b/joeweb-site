import { NextResponse } from "next/server";
import { getUnlockedMemories } from "../../../lib/giftsDb";

export async function GET() {
  try {
    const memories = await getUnlockedMemories();

    return NextResponse.json({
      success: true,
      memories: memories.map((memory) => ({
        memoryId: memory.memory_id,
        guestName: memory.guest_name,
        unlockToken: memory.unlock_token,
      })),
    });
  } catch (error) {
    console.error("Unlocked memories error", error);

    return NextResponse.json({
      success: true,
      memories: [],
    });
  }
}
