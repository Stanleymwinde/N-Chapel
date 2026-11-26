/** A PDF link is "real" once it is set to something other than "TODO". */
export const hasPdf = (url: string | null | undefined): url is string => !!url && url.trim().toUpperCase() !== "TODO";
