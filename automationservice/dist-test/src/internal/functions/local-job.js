/** User-owned function implementation. The generator preserves this file. */
/** Create a job message identifying the local scheduled firing. */
export class LocalJob {
    map(context, _stream, value, out) {
        return out.out(context, `local:${value.scheduleId}:${value.triggerId}`);
    }
}
/** Construct LocalJob once while the service graph is initialized. */
export function makeLocalJob(context, environment, config) {
    void context;
    void environment;
    void config;
    return new LocalJob();
}
//# sourceMappingURL=local-job.js.map