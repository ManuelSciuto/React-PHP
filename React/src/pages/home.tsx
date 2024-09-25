import { useEffect, useState } from "react";

function Home() {
  const [numReplica, setNumReplica] = useState("");

  useEffect(() => {
    setNumReplica(
      process.env.REACT_APP_REPLICA_NUM
        ? process.env.REACT_APP_REPLICA_NUM
        : "Numero replica assente"
    );
  });

  return (
    <div>
      <h1>Replica Numero: {numReplica}</h1>
    </div>
  );
}

export default Home;
