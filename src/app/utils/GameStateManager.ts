import fs from "node:fs";
import path from "node:path";
import { config } from "./config.ts";

const isDirectory = async (path: string): Promise<boolean> => {
  if (!fs.existsSync(path)) {
    return false;
  }

  return (await Deno.stat(path)).isDirectory;
};

const copyRecursiveSync = (src: string, dest: string) => {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    for (const entry of fs.readdirSync(src)) {
      const srcEntry = path.join(src, entry);
      const destEntry = path.join(dest, entry);
      copyRecursiveSync(srcEntry, destEntry);
    }
  } else {
    fs.copyFileSync(src, dest);
  }
};

export class GameStateManager {
  static new() {
    return new GameStateManager();
  }

  private constructor(public readonly characterUrl = config.CharacterLocationPath) {}

  async load(): Promise<Error | void> {
    if (!await this.isValidCharacterLocation()) {
      return Error("invalid-character-location");
    }

    if (!await this.isQuicksaveAvailable()) {
      return Error("missing-quicksave");
    }

    const quicksavePath = this.quicksavePath();
    const exitsavePath = this.exitsavePath();

    if (fs.existsSync(exitsavePath)) {
      fs.rmdirSync(exitsavePath, { recursive: true });
    }
    fs.mkdirSync(exitsavePath, { recursive: true });

    copyRecursiveSync(quicksavePath, exitsavePath);
  }

  async save(): Promise<Error | void> {
    if (!await this.isValidCharacterLocation()) {
      return Error("invalid-character-location");
    }

    if (!await this.isExitsaveAvailable()) {
      return Error("missing-exitsave");
    }

    const quicksavePath = this.quicksavePath();
    const exitsavePath = this.exitsavePath();

    if (fs.existsSync(quicksavePath)) {
      fs.rmdirSync(quicksavePath, { recursive: true });
    }
    fs.mkdirSync(quicksavePath, { recursive: true });

    copyRecursiveSync(exitsavePath, quicksavePath);
  }

  private exitsavePath(): string {
    return path.join(this.characterUrl, "exitsave_1");
  }

  private quicksavePath(): string {
    return path.join(this.characterUrl, "Quicksave");
  }

  private async isValidCharacterLocation(): Promise<boolean> {
    return await isDirectory(this.characterUrl);
  }

  async isExitsaveAvailable(): Promise<boolean> {
    return await isDirectory(this.exitsavePath());
  }

  async isQuicksaveAvailable(): Promise<boolean> {
    return await isDirectory(this.quicksavePath());
  }
}
