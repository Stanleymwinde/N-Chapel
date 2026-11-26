"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache, { type EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

/**
 * Collects Emotion (Chakra) styles during server rendering and emits them in
 * the document head, instead of inline <style> tags inside <body>. Without it,
 * the server HTML and the first client render differ and React re-renders the
 * whole page on the client (a hydration mismatch).
 */
export function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [registry] = useState(() => {
    const cache: EmotionCache = createCache({ key: "css" });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: { name: string; isGlobal: boolean }[] = [];
    cache.insert = (...args) => {
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({ name: serialized.name, isGlobal: !selector });
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prev = inserted;
      inserted = [];
      return prev;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = registry.flush();
    if (names.length === 0) return null;
    let styles = "";
    let dataEmotion = registry.cache.key;
    const globals: { name: string; style: string }[] = [];
    for (const { name, isGlobal } of names) {
      const style = registry.cache.inserted[name];
      if (typeof style !== "string") continue;
      if (isGlobal) globals.push({ name, style });
      else {
        styles += style;
        dataEmotion += ` ${name}`;
      }
    }
    return (
      <>
        {globals.map(({ name, style }) => (
          <style key={name} data-emotion={`${registry.cache.key}-global ${name}`} dangerouslySetInnerHTML={{ __html: style }} />
        ))}
        {styles && <style data-emotion={dataEmotion} dangerouslySetInnerHTML={{ __html: styles }} />}
      </>
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
