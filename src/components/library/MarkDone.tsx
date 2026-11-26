"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@chakra-ui/react";
import { Check, Circle } from "lucide-react";

const KEY = "nc-library-done";
const listeners = new Set<() => void>();

function readRaw(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parse(raw: string): string[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(list: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Private mode or blocked storage: nothing is remembered, nothing breaks.
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

/**
 * "Mark as done": remembered in this browser only (no account needed).
 * The server and first paint show "Mark as done"; storage is read after.
 */
export function MarkDone({ slug }: { slug: string }) {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "[]");
  const done = parse(raw).includes(slug);

  const toggle = () => {
    const list = parse(readRaw()).filter((s) => s !== slug);
    if (!done) list.push(slug);
    write(list);
  };

  return (
    <Button variant={done ? "primary" : "secondary"} aria-pressed={done} onClick={toggle} minH="44px">
      {done ? <Check aria-hidden="true" /> : <Circle aria-hidden="true" />}
      {done ? "Done" : "Mark as done"}
    </Button>
  );
}
