import Link from "next/link";
export default function Clients() {
  // const clients = new Map([
  //   [1, "Rene"],
  //   [2, "Erica"],
  // ]);

  // ou
  const clients = [
    { id: 1, name: "Rene" },
    { id: 2, name: "Erica" },
  ];
  return (
    <div>
      <h1>Clients page</h1>
      <ul>
        {/* {Array.from(clients).map(([value, key]) => {
          return (
            <li key={key}>
              <Link
                href={{
                  pathname: `/clients/[id]`,
                  query: { id: value },
                }}
              >
                {key}
              </Link>
            </li>
          );
        })} */}
        {clients.map((client) => {
          const {id, name}
          return (
            <li key={id}>
              {/* <Link href={`/clients/${id}`}>{name}</Link> */}
              <Link
                href={{
                  pathname: `/clients/[id]`,
                  query: { id: id },
                }}
              >{name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
