import React from "react";

export default function PodCard({ pods }) {
  if (!pods) return null;

  return (
    <div className="bg-white p-6 rounded shadow">
      {pods.map((pod) => (
        <div
          key={pod.metadata.name}
          className="border rounded p-3 mb-3 bg-gray-50"
        >
          <p className="font-bold">{pod.metadata.name}</p>
          <p>Status: {pod.status.phase}</p>
          <p>Node: {pod.spec.nodeName}</p>
          <p>Restarts: {pod.status.containerStatuses?.[0]?.restartCount}</p>
        </div>
      ))}
    </div>
  );
}