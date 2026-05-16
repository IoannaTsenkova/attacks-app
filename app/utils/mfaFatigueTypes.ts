export type AttackStep = "login" | "mfa" | "result";

export type SimulationResultType = "approved" | "denied";

export type MfaRequest = {
  id: number;
  location: string;
  device: string;
  browser: string;
  time: string;
};
