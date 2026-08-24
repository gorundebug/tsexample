import type {
  RuntimeEnvironment,
  Stream,
  StreamConfig,
} from "@gorundebug/tsservicelib/runtime";

const config: StreamConfig = {
  id: 1,
  name: "test",
  properties: {},
  type: "Map",
  pipeline: "test",
  idService: 4,
  idSource: 0,
  idSources: [],
  xPos: 0,
  yPos: 0,
};

export class TestStream implements Stream {
  public readonly id = config.id;
  public readonly name = config.name;
  public readonly transformationName = config.type;

  public runtimeEnvironment(): RuntimeEnvironment {
    throw new Error("runtime environment is not used by this test stream");
  }

  public config(): StreamConfig {
    return config;
  }
}
