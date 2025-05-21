import { FromAllTabsSourceInfo } from "./FromAllTabsSourceInfo";

// Union type for all source info types. This allows us to easily add new source info types in the future without changing the rest of the codebase.
// This is useful for type checking and ensuring that all source info types are handled correctly in the code.
export type SourceInfo = FromAllTabsSourceInfo;