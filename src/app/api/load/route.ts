import { GameStateManager } from "@utils/GameStateManager.ts";

const instance = GameStateManager.new();

export async function GET() {
  const result = await instance.load();

  if (result instanceof Error) {
    return Response.json({ message: result.message }, { status: 400 });
  }

  return Response.json({ message: "Load successful." });
}

export async function POST() {
  const result = await instance.load();

  if (result instanceof Error) {
    return Response.json({ message: result.message }, { status: 400 });
  }

  return Response.json({ message: "Load successful." });
}
