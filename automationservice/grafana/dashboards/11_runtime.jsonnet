// Dashboard: Node.js Runtime & Process
//
// Sources: prom-client collectDefaultMetrics for standard Node.js, V8 and
// process metrics; ServiceLib's runtime_worker_utilization is sampled through
// Node.js perf_hooks. No synthetic runtime series are introduced.

local g = import 'github.com/grafana/grafonnet/gen/grafonnet-v11.0.0/main.libsonnet';
local lib = import '_lib.libsonnet';

local jobFilter = 'job=~"$job"';

lib.dashboard(
  title='%s / Node.js Runtime & Process' % lib.svc,
  uid='%s-runtime' % lib.svc,
  tags=['runtime', 'nodejs'],
  variables=[
    lib.dsVar,
    lib.jobVar('nodejs_version_info'),
  ],
  panels=[
    lib.row('Event Loop'),

    lib.ts(
      title='Event Loop Lag',
      targets=[
        lib.promQ('nodejs_eventloop_lag_seconds{%s}' % jobFilter, 'current {{job}}'),
        lib.promQ('nodejs_eventloop_lag_p99_seconds{%s}' % jobFilter, 'p99 {{job}}'),
        lib.promQ('nodejs_eventloop_lag_max_seconds{%s}' % jobFilter, 'max {{job}}'),
      ],
      w=12, h=8,
      unit='s',
    ),

    lib.ts(
      title='Event Loop Utilization',
      targets=[
        lib.promQ('runtime_worker_utilization{%s}' % jobFilter, '{{job}}'),
      ],
      w=12, h=8,
      unit='percentunit',
    ),

    lib.ts(
      title='Active Resources',
      targets=[
        lib.promQ('nodejs_active_resources_total{%s}' % jobFilter, 'resources {{job}}'),
        lib.promQ('nodejs_active_handles_total{%s}' % jobFilter, 'handles {{job}}'),
        lib.promQ('nodejs_active_requests_total{%s}' % jobFilter, 'requests {{job}}'),
      ],
      w=24, h=8,
      unit='short',
    ),

    lib.row('V8 Heap'),

    lib.ts(
      title='Heap Used vs Total',
      targets=[
        lib.promQ('nodejs_heap_size_used_bytes{%s}' % jobFilter, 'used {{job}}'),
        lib.promQ('nodejs_heap_size_total_bytes{%s}' % jobFilter, 'total {{job}}'),
        lib.promQ('nodejs_external_memory_bytes{%s}' % jobFilter, 'external {{job}}'),
      ],
      w=12, h=8,
      unit='bytes',
    ),

    lib.ts(
      title='Heap Spaces',
      targets=[
        lib.promQ('nodejs_heap_space_size_used_bytes{%s}' % jobFilter, '{{space}} used'),
        lib.promQ('nodejs_heap_space_size_available_bytes{%s}' % jobFilter, '{{space}} available'),
      ],
      w=12, h=8,
      unit='bytes',
    ),

    lib.row('Garbage Collection'),

    lib.ts(
      title='GC Pause Duration p50 / p95 / p99',
      targets=[
        lib.promQ(
          'histogram_quantile(0.50, sum(rate(nodejs_gc_duration_seconds_bucket{%s}[$__rate_interval])) by (le, kind))' % jobFilter,
          'p50 {{kind}}'
        ),
        lib.promQ(
          'histogram_quantile(0.95, sum(rate(nodejs_gc_duration_seconds_bucket{%s}[$__rate_interval])) by (le, kind))' % jobFilter,
          'p95 {{kind}}'
        ),
        lib.promQ(
          'histogram_quantile(0.99, sum(rate(nodejs_gc_duration_seconds_bucket{%s}[$__rate_interval])) by (le, kind))' % jobFilter,
          'p99 {{kind}}'
        ),
      ],
      w=12, h=8,
      unit='s',
    ),

    lib.ts(
      title='GC Runs per Second',
      targets=[
        lib.rate('nodejs_gc_duration_seconds_count', jobFilter, '{{kind}}'),
      ],
      w=12, h=8,
      unit='ops',
    ),

    lib.row('Process'),

    lib.ts(
      title='CPU Usage',
      targets=[
        lib.rate('process_cpu_seconds_total', jobFilter, '{{job}}'),
      ],
      w=12, h=8,
      unit='s/s',
    ),

    lib.ts(
      title='Resident Memory (RSS)',
      targets=[
        lib.promQ('process_resident_memory_bytes{%s}' % jobFilter, '{{job}}'),
      ],
      w=12, h=8,
      unit='bytes',
    ),

    lib.stat(
      title='Process Start Time',
      targets=[
        lib.promQ('process_start_time_seconds{%s} * 1000' % jobFilter, '{{job}}'),
      ],
      w=12, h=4,
      unit='dateTimeAsLocal',
      reduceCalc='lastNotNull',
    ),
  ]
)
