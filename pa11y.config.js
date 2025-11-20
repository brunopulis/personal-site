module.exports = {
  defaults: {
    timeout: 10000,
    wait: 1000,
    chromeLaunchConfig: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
    standard: "WCAG2AA",
    runners: ["axe", "htmlcs"],
    includeNotices: false,
    includeWarnings: true,
    // Ignorar erros específicos se necessário
    ignore: [
      // Exemplo: 'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail'
    ],
  },
  urls: [
    {
      url: "http://localhost:4321/",
      screenCapture: "./reports/home.png",
    },
    {
      url: "http://localhost:4321/sobre",
      screenCapture: "./reports/sobre.png",
    },
  ],
};
