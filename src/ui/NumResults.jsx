function NumResults({ results, value }) {
  return (
    <p>
      <strong>{results.length}</strong> {value}
      {results.length != 1 && "s"} Found
    </p>
  );
}

export default NumResults;
