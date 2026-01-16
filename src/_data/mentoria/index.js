import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const __dirname = new URL(".", import.meta.url).pathname;

function loadYaml(file) {
  const fullPath = path.join(__dirname, file);
  return yaml.load(fs.readFileSync(fullPath, "utf8"));
}

function deepMerge(base, override) {
  return {
    ...base,
    ...override,
    conversion: {
      ...base.conversion,
      ...override.conversion,
      scarcity: {
        ...base.conversion?.scarcity,
        ...override.conversion?.scarcity,
      },
      urgency: {
        ...base.conversion?.urgency,
        ...override.conversion?.urgency,
      },
      bonus: {
        ...base.conversion?.bonus,
        ...override.conversion?.bonus,
      },
      cta: {
        ...base.conversion?.cta,
        ...override.conversion?.cta,
        primary: {
          ...base.conversion?.cta?.primary,
          ...override.conversion?.cta?.primary,
        },
      },
    },
  };
}

export default function () {
  const base = loadYaml("base.yaml");
  const individual = loadYaml("individual.yaml");

  return {
    individual: deepMerge(base, individual),
  };
}
