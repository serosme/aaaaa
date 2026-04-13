export const IPC_CHANNELS = {
  GET_APPLICATIONS: 'system:get-applications',
  LAUNCH_APPLICATION: 'system:launch-application',
  CONFIG_GET: 'config:get',
  CONFIG_SET: 'config:set',
  CONFIG_UNSET: 'config:unset',
  CONFIG_HAS: 'config:has',
} as const
