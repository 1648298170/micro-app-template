const metrics = [
  ['Active users', '18,420'],
  ['Pending reviews', '137'],
  ['Risk alerts', '9'],
]

export function DashboardPage() {
  return (
    <section className="metric-strip">
      {metrics.map(([label, value]) => (
        <article className="metric-tile" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </section>
  )
}
