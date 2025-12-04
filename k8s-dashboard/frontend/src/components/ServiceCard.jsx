import React from "react";

export default function ServiceCard({ service }) {
  return (
    <div className="bg-white p-6 rounded shadow mb-4">
      <h3 className="text-lg font-bold">{service.metadata.name}</h3>
      <p>Port: {service.spec.ports[0].port}</p>
      <p>TargetPort: {service.spec.ports[0].targetPort}</p>
      <p>Selector: {JSON.stringify(service.spec.selector)}</p>
    </div>
  );
}