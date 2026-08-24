/** User-owned function implementation. The generator preserves this file. */
/** Create a job message identifying the durable scheduled firing. */
export class TemporalJob {
    map(context, _stream, value, out) {
        return out.out(context, `temporal:${value.scheduleId}:${value.triggerId}`);
    }
}
/** Construct TemporalJob once while the service graph is initialized. */
export function makeTemporalJob(context, environment, config) {
    void context;
    void environment;
    void config;
    return new TemporalJob();
}
//# sourceMappingURL=temporal-job.js.map