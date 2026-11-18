"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createRealtimeClient } from "@neon/realtime/client";
import type { reservationFeed } from "../../lib/neon-services";

type Feed = NonNullable<Awaited<ReturnType<typeof reservationFeed>>>;

export function NeonFeed({ feed, total }: { feed: Feed; total: number }) {
  const router = useRouter();
  useEffect(() => {
    let count = total;
    const client = createRealtimeClient({ url: feed.url });
    const subscription = client.subscribe(feed.query);
    const unsubscribe = subscription.onChange(snapshot => {
      const next = snapshot.data[0]?.total;
      if (next === undefined || count === next) return;
      count = next;
      router.refresh();
    });
    return () => {
      unsubscribe();
      subscription.unsubscribe();
    };
  }, [feed, router, total]);
  return null;
}
