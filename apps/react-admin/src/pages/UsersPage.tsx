const users = [
  { id: 'U-1001', name: 'Platform Admin', status: 'Active' },
  { id: 'U-1002', name: 'Ops Reviewer', status: 'Pending' },
  { id: 'U-1003', name: 'Tenant Owner', status: 'Active' },
]

export function UsersPage() {
  return (
    <section className="data-section">
      <h3>User directory</h3>
      <table className="data-table" aria-label="Users">
        <tbody>
          {users.map((user) => (
            <tr className="data-row" key={user.id}>
              <td>{user.id}</td>
              <td>
                <strong>{user.name}</strong>
              </td>
              <td>
                <em>{user.status}</em>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
