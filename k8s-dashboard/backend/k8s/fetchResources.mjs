import * as k8s from "@kubernetes/client-node";
import { findMatchingIngresses } from "./findMatchingIngresses.js";

export async function getWorkloadDetails({ namespace, deploymentName }) {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();

  const apps = kc.makeApiClient(k8s.AppsV1Api);
  const core = kc.makeApiClient(k8s.CoreV1Api);
  const net = kc.makeApiClient(k8s.NetworkingV1Api);

  // ------------------------------------------
  // Load Deployment
  // ------------------------------------------
  const deployResp = await apps.readNamespacedDeployment(deploymentName, namespace);
  const workload = deployResp.body;

  // ------------------------------------------
  // Load Services (matching selector labels)
  // ------------------------------------------
  const selector = workload.spec.selector.matchLabels || {};
  const svcResp = await core.listNamespacedService(namespace);

  const matchingServices = svcResp.body.items.filter((svc) => {
    const labels = svc.spec.selector || {};
    return Object.entries(selector).every(([k, v]) => labels[k] === v);
  });

  // ------------------------------------------
  // Load Ingresses and match them to service names
  // ------------------------------------------
  const ingResp = await net.listNamespacedIngress(namespace);
  const allIngresses = ingResp.body.items;

  const matchingIngresses = findMatchingIngresses({
    allIngresses,
    matchingServices,
    namespace,
  });

  // ------------------------------------------
  // Load Pods related to the Deployment
  // ------------------------------------------
  const labelSelector = Object.entries(selector)
    .map(([k, v]) => `${k}=${v}`)
    .join(",");

  const podResp = await core.listNamespacedPod(
    namespace,
    undefined,
    undefined,
    undefined,
    undefined,
    labelSelector
  );

  const pods = podResp.body.items || [];

  // ------------------------------------------
  // Load all Namespaces
  // ------------------------------------------
  const nsResp = await core.listNamespace();
  const namespaces = nsResp.body.items.map((n) => n.metadata.name);

  // ------------------------------------------
  // Return unified object (never undefined)
  // ------------------------------------------
  return {
    workload,
    matchingServices,
    matchingIngresses,
    pods,
    namespaces,
  };
}