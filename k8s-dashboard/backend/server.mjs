import express from "express";
import cors from "cors";
import * as k8s from "@kubernetes/client-node";
import { getWorkloadDetails } from "./k8s/fetchResources.mjs";

const app = express();
app.use(cors());
app.use(express.json());

/**
 * GET /api/workload
 * Example:
 *   /api/workload?namespace=demo&deployment=demo-app
 */
app.get("/api/workload", async (req, res) => {
  try {
    const namespace = req.query.namespace || "demo";
    const deploymentName = req.query.deployment || "demo-app";

    const data = await getWorkloadDetails({ namespace, deploymentName });

    res.json(data);
  } catch (err) {
    console.error("ERROR in /api/workload:", err);
    res.status(500).json({ error: err.toString() });
  }
});

/**
 * GET /api/namespaces
 * Returns:
 * { namespaces: ["default", "kube-system", "demo", ...] }
 */
app.get("/api/namespaces", async (req, res) => {
  try {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const core = kc.makeApiClient(k8s.CoreV1Api);

    const nsResp = await core.listNamespace();
    const namespaces = nsResp.body.items.map((ns) => ns.metadata.name);

    res.json({ namespaces });
  } catch (err) {
    console.error("ERROR in /api/namespaces:", err);
    res.status(500).json({ error: err.toString() });
  }
});

// ---- START SERVER ----
app.listen(9000, () => {
  console.log("Backend running on http://localhost:9000");
});