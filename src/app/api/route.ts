import { config } from "@utils/config.ts";

export function GET() {
  return Response.json({ message: "Hello, world!", path: config.CharacterLocationPath! });
}
