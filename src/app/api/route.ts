export function GET() {
  return Response.json({
    routes: [
      {
        path: "/api/load",
        method: "GET",
        description: "Load the game state",
      },
      {
        path: "/api/save",
        method: "GET",
        description: "Save the game state",
      },
    ],
  });
}
