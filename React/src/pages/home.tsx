function Home() {
  const nomeServizio = process.env.NOME_SERVIZIO || "Unknown Replica";

  return (
    <div>
      <h1>Servizio: {nomeServizio}</h1>
    </div>
  );
}

export default Home;
