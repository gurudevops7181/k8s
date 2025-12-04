export function findMatchingIngresses({ allIngresses, matchingServices, namespace }) {
  if (!allIngresses || !matchingServices) return [];

  const serviceNames = matchingServices.map((s) => s.metadata?.name);
  const out = [];

  for (const ing of allIngresses) {
    if (ing.metadata?.namespace !== namespace) continue;

    const rules = ing.spec?.rules || [];
    for (const rule of rules) {
      const paths = rule.http?.paths || [];
      for (const p of paths) {
        const backendService = p.backend?.service?.name;
        if (serviceNames.includes(backendService)) {
          out.push(ing);
          break;
        }
      }
    }
  }

  return out;
}