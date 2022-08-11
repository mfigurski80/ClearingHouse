import { computed, Ref } from "vue";
import { QueryObserverResult } from "vue-query/types";
import TinyQueue from "tinyqueue";

import type { FetchBondResult } from "@/composables/bondQueries";
import type { FetchCurrencyResult } from "@/composables/currencyQueries";
import { EventType, Direction } from "@/types/enums";

export interface Event {
  completed: boolean;
  bondId: number;
  eventType: EventType;
  direction: Direction;
  timestamp: Date;
  bond?: FetchBondResult;
  currency?: FetchCurrencyResult;
}

export default function useInferredEvents(
  bonds: QueryObserverResult<FetchBondResult, unknown>[],
  n: number | Ref<number>,
  direction: Direction
) {
  const events = computed(() => {
    const bData = bonds
      .map((b) => b.data)
      .filter((b) => b !== undefined) as FetchBondResult[];
    const toGet = typeof n === "number" ? n : n.value;
    if (bData.length === 0 || !toGet || isNaN(toGet)) return [];
    return [...limitGenerator(inferredEvents(bData, direction), toGet)];
  });

  return events;
}

function* limitGenerator<T>(gen: Generator<T>, n: number): Generator<T> {
  let i = n;
  for (const item of gen) {
    yield item;
    i -= 1;
    if (i <= 0) break;
  }
}

/**
 * Infer un-realized events from a list of bonds
 * @param bonds Bonds to generate events for
 * @returns Generator yielding events
 */
function* inferredEvents(
  bonds: FetchBondResult[],
  direction: Direction
): Generator<Event> {
  type ActionMarker = { i: number; time: number };
  const next_actions: TinyQueue<ActionMarker> = new TinyQueue(
    bonds
      .map((b, i) => ({
        i,
        time: b.startTime + b.periodDuration * b.curPeriod,
      }))
      .filter(
        (b, i) => bonds[i].curPeriod <= bonds[i].nPeriods
      ) as ActionMarker[],
    (a, b) => a.time - b.time
  );

  while (next_actions.length > 0) {
    const cur = next_actions.pop() as ActionMarker;
    const next = next_actions.peek();
    let lead = Number.MAX_SAFE_INTEGER;
    if (next) lead = next.time - cur.time;

    const maxPeriods = bonds[cur.i].nPeriods - bonds[cur.i].curPeriod;
    const periodsWant = bonds[cur.i].periodDuration
      ? Math.ceil((lead + 1) / bonds[cur.i].periodDuration)
      : Infinity;
    const periodsAllowed = Math.min(periodsWant, maxPeriods);
    console.table({ maxPeriods, periodsWant, periodsAllowed, lead });

    // console.table({ ...cur, lead, periodsAllowed });
    for (let i = 0; i < periodsAllowed; i++) {
      yield {
        completed: false,
        bondId: bonds[cur.i].id,
        eventType: EventType.SERVICE_PAYMENT,
        direction: direction,
        timestamp: new Date(
          1000 * (cur.time + i * bonds[cur.i].periodDuration)
        ),
        bond: bonds[cur.i],
      };
    }
    if (maxPeriods === periodsAllowed) {
      // complete!!
      yield {
        completed: false,
        bondId: bonds[cur.i].id,
        eventType: EventType.FACE_PAYMENT,
        direction: direction,
        timestamp: new Date(
          1000 * (cur.time + bonds[cur.i].periodDuration * periodsAllowed)
        ),
        bond: bonds[cur.i],
      };
    } else {
      // re-insert bond marker
      next_actions.push({
        i: cur.i,
        time: cur.time + bonds[cur.i].periodDuration * periodsAllowed,
      });
    }
  }
}
