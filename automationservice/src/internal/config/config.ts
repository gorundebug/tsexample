import { ConfigGenerated } from "./config.generated.js";

/** User-owned typed configuration extensions. */
export class Config extends ConfigGenerated {
  public static async load(arguments_: readonly string[]): Promise<Config> {
    return new Config(await ConfigGenerated.loadRuntime(arguments_));
  }
}
