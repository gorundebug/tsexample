import {
  FunctionCollector,
  StreamContext,
  StubSerde,
  makeStreamSerde,
  noopLogger,
  type MessageContext,
  type RuntimeEnvironment,
  type StreamConfig,
  type StreamSerde,
  type TypedStream,
  type TypedStreamConsumer,
} from "@gorundebug/tsservicelib/runtime";

export class TestTypedStream<T> implements TypedStream<T> {
  public readonly id = 1;
  public readonly name = "test";
  public readonly transformationName = "test";
  readonly #serde = makeStreamSerde(new StubSerde<T>());
  #consumer: TypedStreamConsumer<T> | undefined;

  public runtimeEnvironment(): RuntimeEnvironment {
    throw new Error("runtime environment is not used by this test stream");
  }

  public config(): StreamConfig {
    throw new Error("config is not used by this test stream");
  }

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
