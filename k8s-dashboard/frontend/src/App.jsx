import React, { useState } from "react";
import { fetchWorkload, fetchNamespaces } from "./api";

import WorkloadCard from "./components/WorkloadCard";
import PodCard from "./components/PodCard";
import ServiceCard from "./components/ServiceCard";
import IngressCard from "./components/IngressCard";
import Diagram from "./components/Diagram";

export default function App() {
  const [namespaces, setNamespaces] = useState([]);
  const [namespace, setNamespace] = useState("default");
  const [deployment, setDeployment] = useState("");
  const [data, setData] = useState(null);

  React.useEffect(() => {
    fetchNamespaces().then((res) => {
      if (res?.namespaces) {
        setNamespaces(res.namespaces);
      }
    });
  }, []);

  const loadWorkload = async () => {
    if (!deployment.trim()) return;

    const result = await fetchWorkload(namespace, deployment);
    console.log("Fetched data:", result);
    setData(result);
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Kubernetes Dashboard</h1>

      {/* SELECTORS */}
      <div className="flex gap-4 mb-6">
        {/* Namespace selector */}
        <select
          value={namespace}
          onChange={(e) => setNamespace(e.target.value)}
          className="border p-3 rounded w-60"
        >
          {namespaces.map((ns) => (
            <option key={ns} value={ns}>
              {ns}
            </option>
          ))}
        </select>

        {/* Deployment name input */}
        <input
          value={deployment}
          onChange={(e) => setDeployment(e.target.value)}
          className="border p-3 rounded w-80"
          placeholder="Deployment name"
        />

        <button onClick={loadWorkload} className="bg-blue-600 text-white px-6 py-3 rounded">
          Load
        </button>

        <button onClick={() => setData(null)} className="bg-gray-600 text-white px-6 py-3 rounded">
          Refresh
        </button>
      </div>

      {!data ? (
        <p className="text-xl mt-10">Load workload to continue...</p>
      ) : (
        <>
          <WorkloadCard workload={data.workload} />

          <h2 className="text-2xl font-bold mt-10 mb-4">Pods</h2>
          <PodCard pods={data.pods} />

          <h2 className="text-2xl font-bold mt-10 mb-4">Services</h2>
          {data.matchingServices.map((svc) => (
            <ServiceCard key={svc.metadata.name} service={svc} />
          ))}

          <h2 className="text-2xl font-bold mt-10 mb-4">Ingresses</h2>
          {data.matchingIngresses.map((ing) => (
            <IngressCard key={ing.metadata.name} ingress={ing} />
          ))}

          <h2 className="text-2xl font-bold mt-10 mb-4">Diagram</h2>
          <Diagram data={data} />
        </>
      )}
    </div>
  );
}