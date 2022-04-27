export function deepClone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}
export function isJsonObjEqual(obj0: any, obj1: any): boolean {
  return JSON.stringify(obj0) === JSON.stringify(obj1);
}
