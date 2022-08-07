import { reactive } from "vue";
import TinyQueue from "tinyqueue";

import type { FetchBondResult } from "@/composables/bondQueries";
import type { Event, address } from "@/types";
import { EventType, Direction } from "@/types/enums";

const inferredEventsCache: Event[] = reactive([]);

export default function useInferredEvents(
  bonds: FetchBondResult[],
  n: number,
  perspectiveWallet: address
): Event[] {
  console.log("Using inferred events", bonds, n, perspectiveWallet);
  return [...limitGenerator(inferredEvents(bonds, perspectiveWallet), n)];
}

function* limitGenerator<T>(gen: Generator<T>, n: number): Generator<T> {
  let i = n;
  for (const item of gen) {
    if (i <= 0) break;
    i -= 1;
    yield item;
  }
}

/**
 * Infer un-realized events from a list of bonds
 * @param bonds Bonds to generate events for
 * @returns Generator yielding events
 */
function* inferredEvents(
  bonds: FetchBondResult[],
  perspectiveWallet: address
): Generator<Event> {
  type ActionMarker = { i: number; time: number; direction: Direction };
  const next_actions: TinyQueue<ActionMarker> = new TinyQueue(
    bonds
      .map((b, i) => ({
        i,
        time: b.startTime + b.couponSize * b.curPeriod,
        direction:
          b.beneficiary === perspectiveWallet || b.owner === perspectiveWallet
            ? Direction.INCOMING
            : b.minter === perspectiveWallet
            ? Direction.OUTGOING
            : null,
      }))
      .filter(
        (b, i) =>
          bonds[i].curPeriod <= bonds[i].nPeriods && b.direction !== null
      ) as ActionMarker[],
    (a, b) => a.time - b.time
  );

  console.log(next_actions);

  while (next_actions.length > 0) {
    const cur = next_actions.pop() as ActionMarker;
    const next = next_actions.peek();
    let lead = Number.MAX_SAFE_INTEGER;
    if (next) lead = next.time - cur.time;

    const maxPeriods = bonds[cur.i].nPeriods - bonds[cur.i].curPeriod;
    const periodsWant = Math.ceil(lead / bonds[cur.i].periodDuration);
    const periodsAllowed = Math.min(periodsWant, maxPeriods);
    for (let i = 0; i < periodsAllowed; i++) {
      yield {
        completed: false,
        bondId: bonds[cur.i].id,
        eventType: EventType.SERVICE_PAYMENT,
        direction: cur.direction,
        timestamp: new Date(
          1000 * (cur.time + i * bonds[cur.i].periodDuration)
        ),
      };
    }
    if (maxPeriods === periodsAllowed) {
      // complete!!
      yield {
        completed: false,
        bondId: bonds[cur.i].id,
        eventType: EventType.FACE_PAYMENT,
        direction: cur.direction,
        timestamp: new Date(
          1000 * (cur.time + bonds[cur.i].periodDuration * periodsAllowed)
        ),
      };
    } else {
      // re-insert bond marker
      next_actions.push({
        i: cur.i,
        time: cur.time + bonds[cur.i].periodDuration * periodsAllowed,
        direction: cur.direction,
      });
    }
  }
}
