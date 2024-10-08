import useSecureData from "../hooks/useSecureData";

const RenderSecureData = () => {
  const { data } = useSecureData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Secure Data</h2>
        {data ? (
          <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 overflow-x-auto">
            {JSON.stringify(data, null, 2)}{" "}
          </pre>
        ) : (
          <p className="text-lg text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default RenderSecureData;
