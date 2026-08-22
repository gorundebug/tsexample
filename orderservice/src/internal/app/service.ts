import type {
  Context,
  MessageContext,
  ServiceAppOptions,
  ServiceConfig,
} from "@gorundebug/tsservicelib/runtime";
import { opentelemetry } from "@gorundebug/tsservicelib/runtime/telemetry";

import { ServiceGenerated } from "./service.generated.js";

/** User-owned lifecycle and dependency customization for Order Service. */
export class Service extends ServiceGenerated {
  /**
   * Called after generated defaults are installed and before any function is
   * constructed. Replace makers here; this user-owned file survives regeneration.
   */
  protected override customMakersInit(context: MessageContext): void {
    void context;
    // this.makers.mapOrderItemResultToOrderState = customMapOrderItemResultToOrderStateMaker;
    // this.makers.mapToOrderProcessed = customMapToOrderProcessedMaker;
    // this.makers.mapToOrderState = customMapToOrderStateMaker;
    // this.makers.orderProcessedEndpoint = customOrderProcessedEndpointMaker;
    // this.makers.processOrder = customProcessOrderMaker;
    // this.makers.processOrderItem = customProcessOrderItemMaker;
    // this.makers.processOrderItems = customProcessOrderItemsMaker;
    // this.makers.softDeadline = customSoftDeadlineMaker;
  }

  /** Called after every function is constructed and before the graph is wired. */
  protected override customFunctionsInit(context: MessageContext): void {
    void context;
    // Configure this.functions.mapOrderItemResultToOrderState here when post-construction setup is needed.
    // Configure this.functions.mapToOrderProcessed here when post-construction setup is needed.
    // Configure this.functions.mapToOrderState here when post-construction setup is needed.
    // Configure this.functions.orderProcessedEndpoint here when post-construction setup is needed.
    // Configure this.functions.processOrder here when post-construction setup is needed.
    // Configure this.functions.processOrderItem here when post-construction setup is needed.
    // Configure this.functions.processOrderItems here when post-construction setup is needed.
    // Configure this.functions.softDeadline here when post-construction setup is needed.
  }

  protected override createServiceAppOptions(config: ServiceConfig): ServiceAppOptions {
    if (config.environment !== "staging" && config.environment !== "production") {
      return {};
    }
    const endpoint = process.env["OTEL_EXPORTER_OTLP_ENDPOINT"]?.trim();
    const exporter = endpoint === undefined || endpoint === "" ? {} : { endpoint };
    const disabled = (name: string): boolean =>
      ["1", "true", "yes", "on"].includes(process.env[name]?.trim().toLowerCase() ?? "");
    return {
      ...(disabled("SERVICELIB_NOOP_LOGS")
        ? {}
        : {
            logsEngine: new opentelemetry.OpenTelemetryLogsEngine({
              serviceName: config.name,
              ...exporter,
            }),
          }),
      ...(disabled("SERVICELIB_NOOP_TRACING")
        ? {}
        : {
            tracingEngine: new opentelemetry.OpenTelemetryTracingEngine({
              serviceName: config.name,
              ...exporter,
            }),
          }),
    };
  }

  /** Called after the generated runtime has started. */
  protected override onStart(context: Context): Promise<void> {
    void context;
    return Promise.resolve();
  }

  /** Called before the generated runtime begins shutdown. */
  protected override onStop(context: Context): Promise<void> {
    void context;
    return Promise.resolve();
  }
}
