import { format, getTime, formatDistanceToNow } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

export function getUTCDate() {
  var date = new Date();
  var now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  return new Date(now_utc);
}

// Seconds from default time
export function getUTCTimeStamp() {
  var date = getUTCDate();
  var timestamp = date.getTime() / 1000;

  return timestamp;
}

export function getUTCTimeStampMinute(minute = 1) {
  var date = getUTCDate();
  var timestamp = date.getTime() / 1000 + minute * 60; // 60 = seconds in day

  return timestamp;
}

export function getUTCTimeStampDay(day = 6) {
  var date = getUTCDate();
  var timestamp = date.getTime() / 1000 + day * 86400; // 86400 = seconds in day

  return timestamp;
}
