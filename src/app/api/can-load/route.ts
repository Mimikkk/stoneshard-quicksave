import { GameStateManager } from "@utils/GameStateManager.ts";

const instance = GameStateManager.new();
export async function GET() {
  return Response.json({ canLoad: await instance.isQuicksaveAvailable() });
}
