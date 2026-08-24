const config = {
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
export class TestStream {
    id = config.id;
    name = config.name;
    transformationName = config.type;
    runtimeEnvironment() {
        throw new Error("runtime environment is not used by this test stream");
    }
    config() {
        return config;
    }
}
//# sourceMappingURL=stream.js.map