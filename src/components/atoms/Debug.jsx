const Debug = ({ children }) => {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <pre className="mt-4 p-4 text-xs text-yellow-300 bg-black/60 rounded overflow-auto">
      {JSON.stringify(children, null, 2)}
    </pre>
  );
};

export default Debug;
