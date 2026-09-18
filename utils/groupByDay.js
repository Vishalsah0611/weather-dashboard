import {
  toWeekday,
  toDayLabel,
  toDateKey,
} from "./formatters";

export function groupSlotsByDay(
  slots,
  timezoneOffset = 0
) {
  const buckets = new Map();

  for (const slot of slots) {
    const dateKey = toDateKey(
      slot.dt,
      timezoneOffset
    );

    if (!buckets.has(dateKey)) {
      buckets.set(dateKey, {
        key: dateKey,
        weekday: toWeekday(
          slot.dt,
          timezoneOffset
        ),
        dayLabel: toDayLabel(
          slot.dt,
          timezoneOffset
        ),
        slots: [],
        min: slot.main.temp_min,
        max: slot.main.temp_max,
      });
    }

    const bucket = buckets.get(dateKey);

    bucket.slots.push(slot);

    bucket.min = Math.min(
      bucket.min,
      slot.main.temp_min
    );

    bucket.max = Math.max(
      bucket.max,
      slot.main.temp_max
    );
  }

  return Array.from(buckets.values());
}