export default async function Home() {
  const res = await fetch("http://localhost:3000/api/hello");
  const users: User[] = await res.json();
  return (
    <div>
      главная
      <div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
}
