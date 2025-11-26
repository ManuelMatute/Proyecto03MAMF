// src/hooks/use-interests.ts
import { useEffect, useState } from "react";
import { Interest, subscribeInterests } from "@/lib/interests";

export function useInterests() {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeInterests((data) => {
      setInterests(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { interests, loading };
}
