import { getAnonymousSessionId } from "@/utils/session";
import { supabase } from "@/utils/supabase";

export type AttackType = "bitb" | "mfa" | "xss" | "clickjacking";

export type AttackEvent =
  | "started"
  | "victim"
  | "safe"
  | "blocked"
  | "credentials_submitted"
  | "approved"
  | "denied"
  | "token_captured"
  | "hidden_action_triggered";

type TrackAttackEventParams = {
  attack: AttackType;
  event: AttackEvent;
};

export async function trackAttackEvent({
  attack,
  event,
}: TrackAttackEventParams) {
  const sessionId = getAnonymousSessionId();

  if (!sessionId) {
    return;
  }

  const { error } = await supabase.from("attack_events").insert({
    session_id: sessionId,
    attack,
    event,
  });

  if (error) {
    console.error("Failed to track attack event:", error.message);
  }
}
