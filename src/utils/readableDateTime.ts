const units = [
  { value: 31536000, unit: "year" },
  { value: 2592000, unit: "month" },
  { value: 604800, unit: "week" },
  { value: 86400, unit: "day" },
  { value: 3600, unit: "hour" },
  { value: 60, unit: "minute" },
  { value: 1, unit: "second" },
];

export function toReadableInterval(d: number) {
  d = Math.abs(Math.floor(d / 1000));
  let unit = units[6];
  // unit = units.find((u) => d >= u.value) || units[-1];
  for (let i = 0; i < units.length - 1; i++) {
    if (
      d > units[i].value * 2 ||
      (d > units[i].value - units[i + 1].value &&
        d < units[i].value + units[i + 1].value)
    ) {
      unit = units[i];
      break;
    }
  }
  const n = Math.floor(d / unit.value);
  return `${n} ${unit.unit}${n === 1 ? "" : "s"}`;
}

export function toRelativeDate(d: Date) {
  const diff = new Date().getTime() - d.getTime();
  const interval = toReadableInterval(diff);
  if (diff > 0) {
    return `${interval} ago`;
  }
  return `in ${interval}`;
}
