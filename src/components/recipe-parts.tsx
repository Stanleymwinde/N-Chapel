"use client";

/**
 * Slot-recipe parts for the shared components. These are thin client
 * wrappers so server components can compose them with plain JSX.
 * Styles live in src/theme/recipes/*; never restyle these ad hoc in pages.
 */
import { createSlotRecipeContext, type HTMLChakraProps, type RecipeVariantProps } from "@chakra-ui/react";
import { contentCardRecipe } from "@/theme/recipes/card";
import { factListRecipe } from "@/theme/recipes/fact-list";
import { filterBarRecipe } from "@/theme/recipes/filter-bar";
import { pathwayStepRecipe } from "@/theme/recipes/pathway-step";

/* ---------- Card ---------- */
const card = createSlotRecipeContext({ key: "contentCard" });
type CardVariantProps = RecipeVariantProps<typeof contentCardRecipe>;
export type CardRootProps = HTMLChakraProps<"article"> & CardVariantProps;

export const CardRoot = card.withProvider<HTMLElement, CardRootProps>("article", "root");
export const CardMedia = card.withContext<HTMLDivElement, HTMLChakraProps<"div">>("div", "media");
export const CardBody = card.withContext<HTMLDivElement, HTMLChakraProps<"div">>("div", "body");
export const CardEyebrow = card.withContext<HTMLParagraphElement, HTMLChakraProps<"p">>("p", "eyebrow");
export const CardTitle = card.withContext<HTMLHeadingElement, HTMLChakraProps<"h3">>("h3", "title");
export const CardDescription = card.withContext<HTMLParagraphElement, HTMLChakraProps<"p">>("p", "description");
export const CardMeta = card.withContext<HTMLUListElement, HTMLChakraProps<"ul">>("ul", "meta");
export const CardChips = card.withContext<HTMLUListElement, HTMLChakraProps<"ul">>("ul", "chips");
export const CardFooter = card.withContext<HTMLDivElement, HTMLChakraProps<"div">>("div", "footer");
export const CardDateBlock = card.withContext<HTMLDivElement, HTMLChakraProps<"div">>("div", "dateBlock");

/* ---------- Fact list ---------- */
const facts = createSlotRecipeContext({ key: "factList" });
type FactVariantProps = RecipeVariantProps<typeof factListRecipe>;
export type FactListRootProps = HTMLChakraProps<"dl"> & FactVariantProps;

export const FactListRoot = facts.withProvider<HTMLDListElement, FactListRootProps>("dl", "root");
export const FactListItem = facts.withContext<HTMLDivElement, HTMLChakraProps<"div">>("div", "item");
export const FactListIcon = facts.withContext<HTMLSpanElement, HTMLChakraProps<"span">>("span", "icon");
export const FactListLabel = facts.withContext<HTMLElement, HTMLChakraProps<"dt">>("dt", "label");
export const FactListValue = facts.withContext<HTMLElement, HTMLChakraProps<"dd">>("dd", "value");

/* ---------- Pathway stepper ---------- */
const pathway = createSlotRecipeContext({ key: "pathwayStep" });
type PathwayVariantProps = RecipeVariantProps<typeof pathwayStepRecipe>;
export type PathwayRootProps = HTMLChakraProps<"ol"> & PathwayVariantProps;

export const PathwayRoot = pathway.withProvider<HTMLOListElement, PathwayRootProps>("ol", "root");
export const PathwayStep = pathway.withContext<HTMLLIElement, HTMLChakraProps<"li">>("li", "step");
export const PathwayNumber = pathway.withContext<HTMLSpanElement, HTMLChakraProps<"span">>("span", "number");
export const PathwayContent = pathway.withContext<HTMLDivElement, HTMLChakraProps<"div">>("div", "content");
export const PathwayTitle = pathway.withContext<HTMLHeadingElement, HTMLChakraProps<"h3">>("h3", "title");
export const PathwayBody = pathway.withContext<HTMLParagraphElement, HTMLChakraProps<"p">>("p", "body");
export const PathwayMeta = pathway.withContext<HTMLParagraphElement, HTMLChakraProps<"p">>("p", "meta");

/* ---------- Filter bar ---------- */
const filter = createSlotRecipeContext({ key: "filterBar" });
type FilterVariantProps = RecipeVariantProps<typeof filterBarRecipe>;
export type FilterBarRootProps = HTMLChakraProps<"div"> & FilterVariantProps;

export const FilterBarRoot = filter.withProvider<HTMLDivElement, FilterBarRootProps>("div", "root");
export const FilterBarControls = filter.withContext<HTMLDivElement, HTMLChakraProps<"div">>("div", "controls");
export const FilterBarChips = filter.withContext<HTMLUListElement, HTMLChakraProps<"ul">>("ul", "chips");
export const FilterBarChip = filter.withContext<HTMLButtonElement, HTMLChakraProps<"button">>("button", "chip");
export const FilterBarCount = filter.withContext<HTMLParagraphElement, HTMLChakraProps<"p">>("p", "count");
