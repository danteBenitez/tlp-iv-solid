import { isObjectIdOrHexString } from "mongoose";

export function parseObjectId(id: string): string | null {
    return isObjectIdOrHexString(id) ? id : null;
}