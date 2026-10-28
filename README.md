# Kubernetes Mini Dashboard

A small local web app for inspecting a Kubernetes Deployment and its related Pods, Services, and Ingresses. The frontend is built with React and Vite; a Node.js/Express API reads cluster resources through the Kubernetes client.

## Features

- Lists namespaces available to the configured Kubernetes identity.
- Loads a Deployment by namespace and name.
- Shows Pods selected by the Deployment's labels, matching Services, and Ingresses that route to those Services.
- Uses the kubeconfig available to the backend process (normally `~/.kube/config`).
- Includes a diagram panel that is currently a placeholder.

The dashboard makes read-only Kubernetes API requests. It does not create or modify cluster resources.

## Repository layout

```text
.
├── README.md
└── k8s-dashboard/
    ├── backend/     # Express API and Kubernetes client
    └── frontend/    # React and Vite UI
```

## Requirements

- Node.js 18 or newer, with npm
- Access to a Kubernetes cluster
- `kubectl` configured for that cluster, or another kubeconfig available to the backend process

The Kubernetes identity used by the backend needs permission to list namespaces and to read Deployments, Pods, Services, and Ingresses. Namespace listing is cluster-wide; workload resources are read in the selected namespace.

## Run locally

Install dependencies in each app directory:

```sh
cd k8s-dashboard/backend
npm ci

cd ../frontend
npm ci
```

Start the backend in one terminal:

```sh
cd k8s-dashboard/backend
node server.mjs
```

It listens on <http://localhost:9000>.

Start the frontend in a second terminal:

```sh
cd k8s-dashboard/frontend
npm run dev
```

Open the Vite URL shown in the terminal (typically <http://localhost:5173>). The frontend currently sends API requests to `http://localhost:9000/api`.

## API

### `GET /api/namespaces`

Returns the namespaces visible to the configured Kubernetes identity:

```json
{
  "namespaces": ["default", "kube-system"]
}
```

### `GET /api/workload?namespace=<namespace>&deployment=<deployment>`

Returns the selected Deployment, Pods matched by its selector, matching Services, matching Ingresses, and the namespace list. For example:

```sh
curl 'http://localhost:9000/api/workload?namespace=default&deployment=web'
```

The response fields are `workload`, `pods`, `matchingServices`, `matchingIngresses`, and `namespaces`. If the query parameters are omitted, the backend defaults to namespace `demo` and Deployment `demo-app`.

## Frontend production build

To create the static frontend bundle:

```sh
cd k8s-dashboard/frontend
npm run build
```

The generated files are written to `k8s-dashboard/frontend/dist/`.
