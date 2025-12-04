import React from "react";

export default function RelationDiagram({ workload, services, ingresses }){
  const svc = services[0];
  const ing = ingresses[0];

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold mb-3">Diagram</h3>
      <div className="flex items-center justify-between">
        <div className="w-1/3 p-3 border rounded text-center">
          <div className="font-bold">Deployment</div>
          <div className="text-sm mt-2">{workload.metadata.name}</div>
        </div>

        <svg width="60" height="40">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#4b5563" />
            </marker>
          </defs>
          <line x1="0" y1="20" x2="60" y2="20" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow)" />
        </svg>

        <div className="w-1/3 p-3 border rounded text-center">
          <div className="font-bold">Service</div>
          <div className="text-sm mt-2">{svc?.metadata?.name || "—"}</div>
        </div>

        <svg width="60" height="40">
          <defs>
            <marker id="arrow2" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#4b5563" />
            </marker>
          </defs>
          <line x1="0" y1="20" x2="60" y2="20" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow2)" />
        </svg>

        <div className="w-1/3 p-3 border rounded text-center">
          <div className="font-bold">Ingress</div>
          <div className="text-sm mt-2">{ing?.metadata?.name || "—"}</div>
        </div>
      </div>
    </div>
  );
}