"use client";

/**
 * Chakra style-prop elements for SERVER components.
 *
 * `chakra.a`, `Alert.Root` etc. are property accesses on a client module,
 * which resolve to `undefined` inside React Server Components. Server files
 * must import these named exports instead (e.g. <ChA>, <ChUl>, <AlertRoot>).
 * Client components ("use client") can keep using `chakra.x` directly.
 */
import { Alert, chakra } from "@chakra-ui/react";

export const ChA = chakra("a");
export const ChAddress = chakra("address");
export const ChBlockquote = chakra("blockquote");
export const ChButton = chakra("button");
export const ChCaption = chakra("caption");
export const ChDd = chakra("dd");
export const ChDetails = chakra("details");
export const ChDiv = chakra("div");
export const ChDl = chakra("dl");
export const ChDt = chakra("dt");
export const ChEm = chakra("em");
export const ChFigcaption = chakra("figcaption");
export const ChFigure = chakra("figure");
export const ChForm = chakra("form");
export const ChH2 = chakra("h2");
export const ChH3 = chakra("h3");
export const ChHr = chakra("hr");
export const ChInput = chakra("input");
export const ChLabel = chakra("label");
export const ChLi = chakra("li");
export const ChNav = chakra("nav");
export const ChOl = chakra("ol");
export const ChP = chakra("p");
export const ChSection = chakra("section");
export const ChSmall = chakra("small");
export const ChSpan = chakra("span");
export const ChStrong = chakra("strong");
export const ChSummary = chakra("summary");
export const ChTable = chakra("table");
export const ChTbody = chakra("tbody");
export const ChTd = chakra("td");
export const ChTh = chakra("th");
export const ChThead = chakra("thead");
export const ChTime = chakra("time");
export const ChTr = chakra("tr");
export const ChUl = chakra("ul");

export const AlertRoot = Alert.Root;
export const AlertIndicator = Alert.Indicator;
export const AlertTitle = Alert.Title;
export const AlertDescription = Alert.Description;
export const AlertContent = Alert.Content;
