import React from "react";

export default function WorkloadCard({ workload }) {
  if (!workload) return null;

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-2">{workload.metadata.name}</h2>

      <p>
        <strong>Namespace:</strong> {workload.metadata.namespace}
      </p>
      <p>
        <strong>Replicas:</strong> {workload.spec.replicas}
      </p>

      <p>
        <strong>Labels:</strong>{" "}
        {JSON.stringify(workload.metadata.labels || {}, null, 2)}
      </p>
    </div>
  );
}