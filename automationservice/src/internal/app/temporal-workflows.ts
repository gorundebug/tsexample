import type { MessageContext } from "@gorundebug/tsservicelib/runtime/graph";

import type { WorkflowServiceMakers } from "./graph.generated.js";

/**
 * User-owned maker customization for code executed inside a Temporal Workflow.
 * This module is bundled into the Workflow isolate and survives regeneration.
 */
export function customWorkflowMakersInit(
  context: MessageContext,
  makers: WorkflowServiceMakers,
): void | Promise<void> {
  void context;
  void makers;
  // makers.activityJobEndpointSink = customActivityJobEndpointSinkMaker;
  // makers.activityJobEndpointSource = customActivityJobEndpointSourceMaker;
  // makers.fanoutActivityAEndpointSink = customFanoutActivityAEndpointSinkMaker;
  // makers.fanoutActivityAEndpointSource = customFanoutActivityAEndpointSourceMaker;
  // makers.fanoutActivityBEndpointSink = customFanoutActivityBEndpointSinkMaker;
  // makers.fanoutActivityBEndpointSource = customFanoutActivityBEndpointSourceMaker;
  // makers.fanoutActivityCEndpointSink = customFanoutActivityCEndpointSinkMaker;
  // makers.fanoutActivityCEndpointSource = customFanoutActivityCEndpointSourceMaker;
  // makers.sequentialActivityAEndpointSink = customSequentialActivityAEndpointSinkMaker;
  // makers.sequentialActivityAEndpointSource = customSequentialActivityAEndpointSourceMaker;
  // makers.sequentialActivityBEndpointSink = customSequentialActivityBEndpointSinkMaker;
  // makers.sequentialActivityBEndpointSource = customSequentialActivityBEndpointSourceMaker;
  // makers.temporalActivityScheduleSource = customTemporalActivityScheduleSourceMaker;
  // makers.activityPause = customActivityPauseMaker;
  // makers.observeActivityResult = customObserveActivityResultMaker;
  // makers.observeFanoutActivityB = customObserveFanoutActivityBMaker;
  // makers.observeFanoutActivityC = customObserveFanoutActivityCMaker;
  // makers.observeWorkflowResult = customObserveWorkflowResultMaker;
  // makers.processActivityJob = customProcessActivityJobMaker;
  // makers.processFanoutActivityA = customProcessFanoutActivityAMaker;
  // makers.processFanoutActivityB = customProcessFanoutActivityBMaker;
  // makers.processFanoutActivityC = customProcessFanoutActivityCMaker;
  // makers.processScheduledActivity = customProcessScheduledActivityMaker;
  // makers.processScheduledWorkflow = customProcessScheduledWorkflowMaker;
  // makers.processSequentialActivityA = customProcessSequentialActivityAMaker;
  // makers.processSequentialActivityB = customProcessSequentialActivityBMaker;
  // makers.processWorkflowJob = customProcessWorkflowJobMaker;
  // makers.scheduledActivityPause = customScheduledActivityPauseMaker;
  // makers.scheduledWorkflowPause = customScheduledWorkflowPauseMaker;
  // makers.workflowPause = customWorkflowPauseMaker;
  // makers.localScheduleSource = customLocalScheduleSourceMaker;
  // makers.fanoutWorkflowJobEndpointSink = customFanoutWorkflowJobEndpointSinkMaker;
  // makers.fanoutWorkflowJobEndpointSource = customFanoutWorkflowJobEndpointSourceMaker;
  // makers.temporalWorkflowScheduleSource = customTemporalWorkflowScheduleSourceMaker;
  // makers.workflowJobEndpointSink = customWorkflowJobEndpointSinkMaker;
  // makers.workflowJobEndpointSource = customWorkflowJobEndpointSourceMaker;
}
