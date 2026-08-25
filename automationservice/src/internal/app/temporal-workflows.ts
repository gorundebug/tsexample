import type { MessageContext } from "@gorundebug/tsservicelib/runtime/graph";

import type { ServiceMakers } from "./graph.generated.js";

/**
 * User-owned maker customization for code executed inside a Temporal Workflow.
 * This module is bundled into the Workflow isolate and survives regeneration.
 */
export function customWorkflowMakersInit(
  context: MessageContext,
  makers: ServiceMakers,
): void {
  void context;
  void makers;
  // makers.activityPause = customActivityPauseMaker;
  // makers.localSchedule = customLocalScheduleMaker;
  // makers.observeActivityResult = customObserveActivityResultMaker;
  // makers.observeWorkflowResult = customObserveWorkflowResultMaker;
  // makers.processActivityJob = customProcessActivityJobMaker;
  // makers.processScheduledActivity = customProcessScheduledActivityMaker;
  // makers.processScheduledWorkflow = customProcessScheduledWorkflowMaker;
  // makers.processWorkflowJob = customProcessWorkflowJobMaker;
  // makers.scheduledActivityPause = customScheduledActivityPauseMaker;
  // makers.scheduledWorkflowPause = customScheduledWorkflowPauseMaker;
  // makers.temporalActivitySchedule = customTemporalActivityScheduleMaker;
  // makers.temporalWorkflowSchedule = customTemporalWorkflowScheduleMaker;
  // makers.workflowPause = customWorkflowPauseMaker;
}
