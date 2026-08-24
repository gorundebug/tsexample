/** User-owned function implementation. The generator preserves this file. */
/** Process one accepted automation job and return its result. */
export class ProcessDurableJob {
    map(context, _stream, value, out) {
        return out.out(context, `processed:${value}`);
    }
}
/** Construct ProcessDurableJob once while the service graph is initialized. */
export function makeProcessDurableJob(context, environment, config) {
    void context;
    void environment;
    void config;
    return new ProcessDurableJob();
}
//# sourceMappingURL=process-durable-job.js.map