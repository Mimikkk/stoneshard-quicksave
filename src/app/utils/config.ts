import { loadEnvConfig } from "@next/env";
import process from "node:process";

loadEnvConfig(process.cwd());

export const config = {
  CharacterLocationPath: process.env.CHARACTER_LOCATION_PATH as string,
};
