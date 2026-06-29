"use client";

import { useEffect, useMemo, useState } from "react";

import { AttackBarChart } from "@/components/dashboard/AttackBarChart";
import { AttackPieChart } from "@/components/dashboard/AttackPieChart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import ScenarioNavigation from "@/components/shared/ScenarioNavigation";
import { supabase } from "@/utils/supabase";

import styles from "@/styles/dashboard.module.scss";

type AttackEventRow = {
  id: string;
  session_id: string;
  attack: string;
  event: string;
  created_at: string;
};

type DashboardStats = {
  totalEvents: number;
  uniqueParticipants: number;
  bitbVictims: number;
  mfaApproved: number;
  mfaDenied: number;
  xssCaptured: number;
  clickjackingTriggered: number;
};

const ATTACK_SCENARIOS = [
  { key: "bitb", label: "BitB" },
  { key: "mfa", label: "MFA Fatigue" },
  { key: "xss", label: "DOM XSS" },
  { key: "clickjacking", label: "Clickjacking" },
] as const;

function calculateStats(events: AttackEventRow[]): DashboardStats {
  const uniqueParticipants = new Set(events.map((event) => event.session_id));

  return {
    totalEvents: events.length,
    uniqueParticipants: uniqueParticipants.size,
    bitbVictims: events.filter(
      (event) => event.attack === "bitb" && event.event === "victim",
    ).length,
    mfaApproved: events.filter(
      (event) => event.attack === "mfa" && event.event === "approved",
    ).length,
    mfaDenied: events.filter(
      (event) => event.attack === "mfa" && event.event === "denied",
    ).length,
    xssCaptured: events.filter(
      (event) => event.attack === "xss" && event.event === "token_captured",
    ).length,
    clickjackingTriggered: events.filter(
      (event) =>
        event.attack === "clickjacking" &&
        event.event === "hidden_action_triggered",
    ).length,
  };
}

function getAttackLabel(attack: string) {
  const scenario = ATTACK_SCENARIOS.find((item) => item.key === attack);

  return scenario?.label ?? attack;
}

function calculateChartData(events: AttackEventRow[]) {
  const successfulEvents = events.filter((event) =>
    [
      "victim",
      "approved",
      "token_captured",
      "hidden_action_triggered",
    ].includes(event.event),
  );

  const grouped = successfulEvents.reduce<Record<string, number>>(
    (acc, event) => {
      acc[event.attack] = (acc[event.attack] ?? 0) + 1;
      return acc;
    },
    {},
  );

  return ATTACK_SCENARIOS.map((scenario) => ({
    attack: scenario.label,
    count: grouped[scenario.key] ?? 0,
  }));
}

function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`;
}

export default function DashboardPage() {
  const [events, setEvents] = useState<AttackEventRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stats = useMemo(() => calculateStats(events), [events]);
  const chartData = useMemo(() => calculateChartData(events), [events]);
  const totalSuccessfulAttackEvents = useMemo(
    () => chartData.reduce((sum, item) => sum + item.count, 0),
    [chartData],
  );
  const summaryRows = useMemo(
    () =>
      chartData.map((item) => ({
        ...item,
        percentage:
          totalSuccessfulAttackEvents > 0
            ? (item.count / totalSuccessfulAttackEvents) * 100
            : 0,
      })),
    [chartData, totalSuccessfulAttackEvents],
  );
  const observations = useMemo(() => {
    const sortedScenarios = [...chartData].sort((a, b) => b.count - a.count);
    const mostTriggered = sortedScenarios[0];
    const leastTriggered = [...chartData].sort((a, b) => a.count - b.count)[0];

    return {
      mostTriggered:
        totalSuccessfulAttackEvents > 0
          ? `${mostTriggered.attack} (${mostTriggered.count})`
          : "No successful scenario recorded",
      leastTriggered:
        totalSuccessfulAttackEvents > 0
          ? `${leastTriggered.attack} (${leastTriggered.count})`
          : "No successful scenario recorded",
      totalSuccessfulAttackEvents,
      participants: stats.uniqueParticipants,
    };
  }, [chartData, stats.uniqueParticipants, totalSuccessfulAttackEvents]);
  const hasEvents = events.length > 0;

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      const { data, error } = await supabase
        .from("attack_events")
        .select("id, session_id, attack, event, created_at")
        .order("created_at", { ascending: false })
        .limit(1000);

      if (error) {
        console.error("Failed to fetch dashboard events:", error);
        setEvents([]);
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      setEvents(data ?? []);
      setIsLoading(false);
    };

    fetchEvents();

    const channel = supabase
      .channel("attack-events-dashboard")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "attack_events",
        },
        (payload: { new: AttackEventRow }) => {
          setErrorMessage(null);
          setEvents((currentEvents) => [payload.new, ...currentEvents]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className={styles.page}>
      <ScenarioNavigation />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Live results</p>
        <h1>Attack Simulation Dashboard</h1>
        <p>
          Anonymous interaction data from the social engineering attack
          simulations.
        </p>
      </section>

      {isLoading ? (
        <section className={styles.loadingCard}>
          Loading dashboard data...
        </section>
      ) : errorMessage ? (
        <section className={styles.emptyCard}>
          <p className={styles.cardLabel}>Dashboard error</p>
          <h2>Analytics could not be loaded.</h2>
          <p>
            Check the browser console for the Supabase error details, then
            verify that `attack_events` allows `select` for the client role
            used by this app.
          </p>
        </section>
      ) : !hasEvents ? (
        <section className={styles.emptyCard}>
          <p className={styles.cardLabel}>No data yet</p>
          <h2>No analytics data has been collected yet.</h2>
          <p>
            Start one of the attack simulations and interact with it to see
            anonymous events appear here.
          </p>
        </section>
      ) : (
        <>
          <section className={styles.statsGrid}>
            <StatsCard label="Total Events" value={stats.totalEvents} />
            <StatsCard label="Participants" value={stats.uniqueParticipants} />
            <StatsCard label="BitB Victims" value={stats.bitbVictims} />
            <StatsCard label="MFA Approved" value={stats.mfaApproved} />
            <StatsCard label="MFA Denied" value={stats.mfaDenied} />
            <StatsCard label="XSS Captured" value={stats.xssCaptured} />
            <StatsCard
              label="Clickjacking Triggered"
              value={stats.clickjackingTriggered}
            />
          </section>

          <section className={styles.chartCard}>
            <div>
              <p className={styles.cardLabel}>Successful attack outcomes</p>
              <h2>Triggered results by scenario</h2>
            </div>

            <AttackBarChart data={chartData} />
          </section>

          <section className={styles.chartCard}>
            <div>
              <p className={styles.cardLabel}>Scenario distribution</p>
              <h2>Distribution of Attack Scenarios</h2>
            </div>

            <AttackPieChart data={chartData} />
          </section>

          <section className={styles.tableCard}>
            <div>
              <p className={styles.cardLabel}>Aggregate results</p>
              <h2>Successful events by scenario</h2>
            </div>

            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>Successful Events</th>
                    <th>Percentage of Total Events</th>
                  </tr>
                </thead>

                <tbody>
                  {summaryRows.map((row) => (
                    <tr key={row.attack}>
                      <td>{row.attack}</td>
                      <td>{row.count}</td>
                      <td>{formatPercentage(row.percentage)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.observationsCard}>
            <div>
              <p className={styles.cardLabel}>Statistical summary</p>
              <h2>Observations</h2>
            </div>

            <div className={styles.observationsGrid}>
              <article>
                <span>Most triggered scenario</span>
                <strong>{observations.mostTriggered}</strong>
              </article>
              <article>
                <span>Least triggered scenario</span>
                <strong>{observations.leastTriggered}</strong>
              </article>
              <article>
                <span>Total successful attack events</span>
                <strong>{observations.totalSuccessfulAttackEvents}</strong>
              </article>
              <article>
                <span>Number of participants</span>
                <strong>{observations.participants}</strong>
              </article>
            </div>
          </section>

          <section className={styles.tableCard}>
            <div>
              <p className={styles.cardLabel}>Recent activity</p>
              <h2>Latest events</h2>
            </div>

            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>Attack</th>
                    <th>Event</th>
                    <th>Session</th>
                    <th>Time</th>
                  </tr>
                </thead>

                <tbody>
                  {events.slice(0, 12).map((event) => (
                    <tr key={event.id}>
                      <td>{getAttackLabel(event.attack)}</td>
                      <td>{event.event}</td>
                      <td>{event.session_id.slice(0, 8)}...</td>
                      <td>{new Date(event.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
