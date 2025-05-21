import { SourceInfoBase } from "./SourceInfoBase";

export interface FromAllTabsSourceInfo extends SourceInfoBase{
    type: "from-all-tabs";
    tabCount: number;
}