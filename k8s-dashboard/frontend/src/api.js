const BASE = "http://localhost:9000/api";

export async function fetchNamespaces() {
  try {
    const res = await fetch(`${BASE}/namespaces`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching namespaces:", err);
    return { namespaces: [] };
  }
}

export async function fetchWorkload(namespace, deployment) {
  try {
    const res = await fetch(
      `${BASE}/workload?namespace=${namespace}&deployment=${deployment}`
    );
    return await res.json();
  } catch (err) {
    console.error("Error fetching workload:", err);
    return null;
  }
}