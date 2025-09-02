import { GameStateManager } from "@utils/GameStateManager.ts";

const instance = GameStateManager.new();
export async function GET() {
  return Response.json({ canSave: await instance.isExitsaveAvailable() });
}
