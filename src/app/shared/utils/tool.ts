import { fromByteArray, toByteArray } from 'base64-js';
export function deepClone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}
export function isJsonObjEqual(obj0: any, obj1: any): boolean {
  return JSON.stringify(obj0) === JSON.stringify(obj1);
}
export const parseTime = (
  time?: object | string | number | null,
  cFormat?: string
): string | null => {
  if (time === undefined || !time) {
    return '--';
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date: Date;
  if (typeof time === 'object') {
    date = time as Date;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      }
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }

    date = new Date(time);
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return timeStr;
};
export class Base64 {
  static encode(plainText: string): string {
    return fromByteArray(pack(plainText)).replace(/[+/=]/g, m => {
      return { '+': '-', '/': '_', '=': '' }[m] as string;
    });
  }

  static decode(b64: string): string {
    b64 = b64.replace(/[-_]/g, m => {
      return { '-': '+', '_': '/' }[m] as string;
    });
    while (b64.length % 4) {
      b64 += '=';
    }

    return unpack(toByteArray(b64));
  }
}

export function pack(str: string) {
  const bytes: any = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(...[str.charCodeAt(i)]);
  }

  return bytes;
}

export function unpack(byteArray: any) {
  return String.fromCharCode(...byteArray);
}

export const base64 = { encode: Base64.encode, decode: Base64.decode };

export function capitalize(text: string): string {
  return text.substring(0, 1).toUpperCase() + text.substring(1, text.length).toLowerCase();
}

export function currentTimestamp(): number {
  return Math.ceil(new Date().getTime() / 1000);
}

export function timeLeft(expiredAt: number): number {
  return Math.max(0, expiredAt - currentTimestamp());
}

export function filterObject<T>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined && value !== null)
  );
}

export function isEmptyObject(obj: Record<string, any>) {
  return Object.keys(obj).length === 0;
}
