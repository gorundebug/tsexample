import {
  FunctionCollector,
  SinkStreamContext,
  StreamContext,
  StubSerde,
  makeStreamSerde,
  noopLogger,
  type MessageContext,
  type DelayStreamConfig,
  type RuntimeEnvironment,
  type Stream,
  type StreamConfig,
  type StreamSerde,
  type TypedStream,
  type TypedStreamConsumer,
} from "@gorundebug/tsservicelib/runtime";

const defaultConfig: StreamConfig = {
  id: 1,
  name: "test",
  properties: {},
  type: "Map",
  pipeline: "test",
  idService: 1,
  idSource: 0,
  idSources: [],
  xPos: 0,
  yPos: 0,
};

export class TestStream implements Stream {
  public readonly id: number;
  public readonly name: string;
  public readonly transformationName: string;
  readonly #config: StreamConfig;

  public constructor(config: StreamConfig = defaultConfig) {
    this.#config = config;
    this.id = config.id;
    this.name = config.name;
    this.transformationName = config.type;
  }

  public runtimeEnvironment(): RuntimeEnvironment {
    throw new Error("runtime environment is not used by this test stream");
  }

  public config(): StreamConfig {
    return this.#config;
  }
}

export class TestTypedStream<T> extends TestStream implements TypedStream<T> {
  readonly #serde = makeStreamSerde(new StubSerde<T>());
  #consumer: TypedStreamConsumer<T> | undefined;

  public serde(): StreamSerde<T> {
    return this.#serde;
  }

  public typeName(): string {
    return this.#serde.typeName();
  }

  public consumer(): TypedStreamConsumer<T> | undefined {
    return this.#consumer;
  }

  public consumers(): readonly TypedStreamConsumer<T>[] {
    return this.#consumer === undefined ? [] : [this.#consumer];
  }

  public setConsumer(consumer: TypedStreamConsumer<T>): void {
    this.#consumer = consumer;
  }
}

export function makeTestSinkStreamContext<T, R, E>(
  values: R[],
  errors: E[],
): SinkStreamContext<T, R, E> {
  return new SinkStreamContext(
    new TestTypedStream<R>(),
    noopLogger,
    new FunctionCollector((_: MessageContext, value: R) => {
      values.push(value);
    }),
    new FunctionCollector((_: MessageContext, value: E) => {
      errors.push(value);
    }),
  );
}

export function makeTestStreamContext<T, R, E>(
  values: T[],
  errors: E[],
): StreamContext<T, R, E> {
  return new StreamContext(
    new TestTypedStream<T>(),
    undefined,
    noopLogger,
    new FunctionCollector((_: MessageContext, value: T) => {
      values.push(value);
    }),
    new FunctionCollector((_: MessageContext, value: E) => {
      errors.push(value);
    }),
  );
}

export function delayStream(duration: number): TestStream {
  const config: DelayStreamConfig = {
    ...defaultConfig,
    type: "Delay",
    duration,
  };
  return new TestStream(config);
}
