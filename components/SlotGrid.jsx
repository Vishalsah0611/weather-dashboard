import SlotCard from "./SlotCard";

export default function SlotGrid({
  slots,
  timezoneOffset,
}) {
  return (
    <div className="slot-grid">
      {slots.map((slot) => (
        <SlotCard
          key={slot.dt}
          slot={slot}
          timezoneOffset={timezoneOffset}
        />
      ))}
    </div>
  );
}