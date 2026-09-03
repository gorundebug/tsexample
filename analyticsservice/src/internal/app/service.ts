import type {
  Context,
  MessageContext,
  ServiceAppOptions,
  ServiceConfig,
} from "@gorundebug/tsservicelib/runtime";
import { opentelemetry } from "@gorundebug/tsservicelib/runtime/telemetry";

import { ServiceGenerated } from "./service.generated.js";

/** User-owned lifecycle and dependency customization for Analytics Service. */
export class Service extends ServiceGenerated {
  /**
   * Called after generated defaults are installed and before any function is
   * constructed. Replace makers here; this user-owned file survives regeneration.
   */
  protected override customMakersInit(context: MessageContext): void | Promise<void> {
    void context;
  }

  /** Called after every function is constructed and before the graph is wired. */
  protected override customFunctionsInit(context: MessageContext): void | Promise<void> {
    void context;
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
