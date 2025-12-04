import React from "react";

export default function IngressCard({ ingress }) {
  return (
    <div className="bg-white p-6 rounded shadow mb-4">
      <h3 className="text-lg font-bold">{ingress.metadata.name}</h3>
      <p>Host: {ingress.spec.rules[0].host}</p>
      <p>Paths: {ingress.spec.rules[0].http.paths.length}</p>
    </div>
  );
}