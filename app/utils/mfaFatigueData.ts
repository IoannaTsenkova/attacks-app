import type { MfaRequest } from "./mfaFatigueTypes";

export const mfaRequests: MfaRequest[] = [
  {
    id: 1,
    location: "Unknown location",
    device: "Windows device",
    browser: "Chrome",
    time: "Just now",
  },
  {
    id: 2,
    location: "Unknown location",
    device: "Windows device",
    browser: "Chrome",
    time: "Few seconds ago",
  },
  {
    id: 3,
    location: "Unknown location",
    device: "Windows device",
    browser: "Chrome",
    time: "Repeated request",
  },
  {
    id: 4,
    location: "Unknown location",
    device: "Windows device",
    browser: "Chrome",
    time: "Suspicious activity",
  },
];
