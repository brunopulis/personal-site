import pa11y from "pa11y";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure as URLs do seu site aqui
const urls = [
  "http://localhost:4321/",
  "http://localhost:4321/sobre",
  "http://localhost:4321/contato",
  "http://localhost:4321/blog",
];

// Configurações do Pa11y
const pa11yOptions = {
  timeout: 10000,
  wait: 1000,
  chromeLaunchConfig: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  standard: "WCAG2AA",
  runners: ["axe", "htmlcs"],
  includeNotices: false,
  includeWarnings: true,
};

async function runTests() {
  console.log("🔍 Iniciando testes de acessibilidade...\n");

  const results = [];
  let totalIssues = 0;
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const url of urls) {
    console.log(`Testing ${url}...`);
    try {
      const result = await pa11y(url, pa11yOptions);

      const errors = result.issues.filter(issue => issue.type === "error");
      const warnings = result.issues.filter(issue => issue.type === "warning");
      const notices = result.issues.filter(issue => issue.type === "notice");

      totalIssues += result.issues.length;
      totalErrors += errors.length;
      totalWarnings += warnings.length;

      results.push({
        url,
        result,
        errors: errors.length,
        warnings: warnings.length,
        notices: notices.length,
      });

      console.log(
        `  ✓ Encontrados: ${result.issues.length} problemas (${errors.length} erros, ${warnings.length} avisos)`
      );
    } catch (error) {
      console.error(`  ✗ Erro ao testar ${url}:`, error.message);
      results.push({ url, error: error.message });
    }
  }

  console.log(
    `\n📊 Total: ${totalIssues} problemas (${totalErrors} erros, ${totalWarnings} avisos)\n`
  );

  // Gerar relatório HTML
  generateHTMLReport(results, totalIssues, totalErrors, totalWarnings);

  // Se houver erros, retornar código de saída 1
  if (totalErrors > 0) {
    process.exit(1);
  }
}

function generateHTMLReport(results, totalIssues, totalErrors, totalWarnings) {
  const reportDir = path.join(__dirname, "reports");

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const timestamp = new Date().toLocaleString("pt-BR");

  let htmlReport = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório de Acessibilidade</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #f5f5f5;
      color: #333;
      line-height: 1.6;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 20px;
      margin-bottom: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
    }
    
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .summary-card {
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-left: 4px solid;
    }
    
    .summary-card.total { border-color: #3f51b5; }
    .summary-card.errors { border-color: #d32f2f; }
    .summary-card.warnings { border-color: #f57c00; }
    
    .summary-card h3 {
      font-size: 0.9em;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    
    .summary-card .number {
      font-size: 2.5em;
      font-weight: bold;
    }
    
    .summary-card.total .number { color: #3f51b5; }
    .summary-card.errors .number { color: #d32f2f; }
    .summary-card.warnings .number { color: #f57c00; }
    
    .url-section {
      background: white;
      margin-bottom: 30px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .url-header {
      background: #f8f9fa;
      padding: 20px;
      border-bottom: 2px solid #e0e0e0;
    }
    
    .url-header h2 {
      color: #333;
      font-size: 1.3em;
      word-break: break-all;
      margin-bottom: 10px;
    }
    
    .url-stats {
      display: flex;
      gap: 20px;
      font-size: 0.9em;
    }
    
    .stat {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .stat.error { color: #d32f2f; }
    .stat.warning { color: #f57c00; }
    .stat.success { color: #388e3c; }
    
    .issues-list {
      padding: 20px;
    }
    
    .issue {
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 5px;
      border-left: 4px solid;
    }
    
    .issue.error {
      background: #ffebee;
      border-color: #d32f2f;
    }
    
    .issue.warning {
      background: #fff3e0;
      border-color: #f57c00;
    }
    
    .issue.notice {
      background: #e1f5fe;
      border-color: #0288d1;
    }
    
    .issue-type {
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.85em;
      margin-bottom: 5px;
    }
    
    .issue.error .issue-type { color: #d32f2f; }
    .issue.warning .issue-type { color: #f57c00; }
    .issue.notice .issue-type { color: #0288d1; }
    
    .issue-message {
      margin-bottom: 10px;
      line-height: 1.5;
    }
    
    .issue-details {
      font-size: 0.85em;
      color: #666;
      background: rgba(0,0,0,0.03);
      padding: 8px;
      border-radius: 3px;
    }
    
    .issue-code {
      font-family: 'Courier New', monospace;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .issue-selector {
      font-family: 'Courier New', monospace;
      word-break: break-all;
    }
    
    .success-message {
      text-align: center;
      padding: 40px;
      color: #388e3c;
      font-size: 1.2em;
    }
    
    .success-message::before {
      content: "✓";
      display: block;
      font-size: 3em;
      margin-bottom: 10px;
    }
    
    footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 0.9em;
      margin-top: 40px;
    }
    
    .error-message {
      background: #ffebee;
      color: #c62828;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #d32f2f;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Relatório de Acessibilidade</h1>
      <p>Gerado em: ${timestamp}</p>
    </header>
    
    <div class="summary">
      <div class="summary-card total">
        <h3>Total de Problemas</h3>
        <div class="number">${totalIssues}</div>
      </div>
      <div class="summary-card errors">
        <h3>Erros</h3>
        <div class="number">${totalErrors}</div>
      </div>
      <div class="summary-card warnings">
        <h3>Avisos</h3>
        <div class="number">${totalWarnings}</div>
      </div>
    </div>
`;

  for (const item of results) {
    if (item.error) {
      htmlReport += `
    <div class="url-section">
      <div class="url-header">
        <h2>${item.url}</h2>
      </div>
      <div class="issues-list">
        <div class="error-message">
          <strong>Erro ao testar:</strong> ${item.error}
        </div>
      </div>
    </div>`;
      continue;
    }

    const { url, result, errors, warnings, notices } = item;

    htmlReport += `
    <div class="url-section">
      <div class="url-header">
        <h2>${url}</h2>
        <div class="url-stats">
          ${errors > 0 ? `<span class="stat error">● ${errors} erros</span>` : ""}
          ${warnings > 0 ? `<span class="stat warning">● ${warnings} avisos</span>` : ""}
          ${result.issues.length === 0 ? '<span class="stat success">✓ Nenhum problema encontrado</span>' : ""}
        </div>
      </div>
      <div class="issues-list">`;

    if (result.issues.length === 0) {
      htmlReport +=
        '<div class="success-message">Nenhum problema de acessibilidade encontrado!</div>';
    } else {
      result.issues.forEach(issue => {
        htmlReport += `
        <div class="issue ${issue.type}">
          <div class="issue-type">${issue.type}</div>
          <div class="issue-message">${issue.message}</div>
          <div class="issue-details">
            <div class="issue-code">Código: ${issue.code}</div>
            <div class="issue-selector">Seletor: ${issue.selector || "N/A"}</div>
          </div>
        </div>`;
      });
    }

    htmlReport += `
      </div>
    </div>`;
  }

  htmlReport += `
    <footer>
      <p>Relatório gerado com Pa11y | Padrão: WCAG 2.1 AA</p>
    </footer>
  </div>
</body>
</html>`;

  const reportPath = path.join(reportDir, "a11y-report.html");
  fs.writeFileSync(reportPath, htmlReport);

  console.log(`✓ Relatório HTML gerado: ${reportPath}`);
  console.log(`  Abra com: xdg-open ${reportPath}\n`);
}

runTests().catch(error => {
  console.error("Erro fatal:", error);
  process.exit(1);
});
