export default function StatusBanner({ kind, children }) {
  return (
    <p className={`status-banner status-${kind}`} role={kind === "error" ? "alert" : "status"}>
      {children}
    </p>
  );
}
