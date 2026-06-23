const controls = [
  ['Style isolation', 'Namespace + qiankun sandbox'],
  ['Route boundary', 'Host first-level paths only'],
  ['Communication', 'Typed props and event bus'],
  ['Versioning', 'Env or manifest driven entries'],
]

export function HomePage() {
  return (
    <section className="home-grid">
      <div className="status-panel">
        <p className="panel-kicker">Runtime</p>
        <h2>Host shell is ready</h2>
        <p>
          The React host owns platform concerns while micro apps keep business modules isolated and
          independently deployable.
        </p>
      </div>
      <div className="control-grid">
        {controls.map(([title, detail]) => (
          <article className="control-card" key={title}>
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
