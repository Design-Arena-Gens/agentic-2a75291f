import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const osintTools = [
    {
      name: 'Shodan',
      category: 'Network Intelligence',
      description: 'Motor de busca para dispositivos conectados à internet, servidores, webcams, IoT e infraestrutura.',
      url: 'https://shodan.io',
      features: ['Busca de dispositivos IoT', 'Análise de vulnerabilidades', 'Monitoramento de rede'],
      freeTier: 'Busca limitada gratuita'
    },
    {
      name: 'Maltego CE',
      category: 'Data Mining',
      description: 'Plataforma de inteligência de código aberto para análise de links e visualização de dados.',
      url: 'https://maltego.com',
      features: ['Mapeamento de relações', 'Visualização gráfica', 'Transforms integrados'],
      freeTier: 'Community Edition gratuita'
    },
    {
      name: 'theHarvester',
      category: 'Email & Domain',
      description: 'Ferramenta para coletar emails, subdomínios, IPs e URLs usando múltiplas fontes públicas.',
      url: 'https://github.com/laramies/theHarvester',
      features: ['Enumeração de emails', 'Descoberta de subdomínios', 'API integrations'],
      freeTier: 'Totalmente gratuito (Open Source)'
    },
    {
      name: 'SpiderFoot',
      category: 'Automation',
      description: 'Ferramenta automatizada de OSINT que integra mais de 200 fontes de dados.',
      url: 'https://spiderfoot.net',
      features: ['Automação completa', 'Scan de múltiplas fontes', 'Correlação de dados'],
      freeTier: 'Versão Open Source gratuita'
    },
    {
      name: 'OSINT Framework',
      category: 'Resources',
      description: 'Coleção organizada de ferramentas e recursos OSINT em formato de árvore.',
      url: 'https://osintframework.com',
      features: ['Categorização completa', 'Links atualizados', 'Interface visual'],
      freeTier: 'Totalmente gratuito'
    },
    {
      name: 'Recon-ng',
      category: 'Reconnaissance',
      description: 'Framework de reconhecimento web com interface modular para OSINT.',
      url: 'https://github.com/lanmaster53/recon-ng',
      features: ['Framework modular', 'Marketplace de módulos', 'Automação de tarefas'],
      freeTier: 'Totalmente gratuito (Open Source)'
    },
    {
      name: 'Google Dorks',
      category: 'Search Intelligence',
      description: 'Técnicas avançadas de busca no Google para descobrir informações sensíveis.',
      url: 'https://google.com',
      features: ['Busca avançada', 'Operadores especiais', 'Cache e arquivos'],
      freeTier: 'Totalmente gratuito'
    },
    {
      name: 'Wigle.net',
      category: 'Wireless',
      description: 'Banco de dados de redes wireless mapeadas globalmente.',
      url: 'https://wigle.net',
      features: ['Mapeamento WiFi', 'Geolocalização', 'API gratuita'],
      freeTier: 'Consultas limitadas gratuitas'
    },
    {
      name: 'Hunter.io',
      category: 'Email & Domain',
      description: 'Encontre endereços de email profissionais associados a um domínio.',
      url: 'https://hunter.io',
      features: ['Busca de emails', 'Verificação de emails', 'Domain search'],
      freeTier: '25 buscas/mês grátis'
    },
    {
      name: 'Censys',
      category: 'Network Intelligence',
      description: 'Plataforma de inteligência de ataques que mapeia toda a internet.',
      url: 'https://censys.io',
      features: ['Scan de internet', 'Análise de certificados', 'Monitoramento contínuo'],
      freeTier: 'Conta gratuita com limites'
    },
    {
      name: 'Have I Been Pwned',
      category: 'Breach Intelligence',
      description: 'Verifica se emails foram comprometidos em vazamentos de dados.',
      url: 'https://haveibeenpwned.com',
      features: ['Busca de breaches', 'Notificações', 'API gratuita'],
      freeTier: 'Totalmente gratuito'
    },
    {
      name: 'Wayback Machine',
      category: 'Archive',
      description: 'Arquivo histórico da internet que preserva snapshots de sites ao longo do tempo.',
      url: 'https://archive.org/web',
      features: ['Histórico de sites', 'Capturas antigas', 'Recuperação de conteúdo'],
      freeTier: 'Totalmente gratuito'
    },
    {
      name: 'IntelX',
      category: 'Data Intelligence',
      description: 'Motor de busca para deep web, dark web, documentos e vazamentos.',
      url: 'https://intelx.io',
      features: ['Busca em dark web', 'Documentos públicos', 'Dados históricos'],
      freeTier: 'Buscas limitadas gratuitas'
    },
    {
      name: 'DNSDumpster',
      category: 'DNS',
      description: 'Ferramenta de pesquisa e descoberta de domínios DNS.',
      url: 'https://dnsdumpster.com',
      features: ['Mapeamento DNS', 'Descoberta de hosts', 'Visualização gráfica'],
      freeTier: 'Totalmente gratuito'
    },
    {
      name: 'Amass',
      category: 'DNS',
      description: 'Ferramenta de enumeração de subdomínios e mapeamento de superfície de ataque.',
      url: 'https://github.com/owasp-amass/amass',
      features: ['Enumeração passiva/ativa', 'Scraping de dados', 'Análise de DNS'],
      freeTier: 'Totalmente gratuito (Open Source)'
    },
    {
      name: 'Social-Analyzer',
      category: 'Social Media',
      description: 'Análise e pesquisa em mais de 1000 plataformas de redes sociais.',
      url: 'https://github.com/qeeqbox/social-analyzer',
      features: ['Busca em múltiplas redes', 'Extração de perfis', 'Análise de padrões'],
      freeTier: 'Totalmente gratuito (Open Source)'
    },
    {
      name: 'Twint',
      category: 'Social Media',
      description: 'Scraping avançado de Twitter sem usar API oficial.',
      url: 'https://github.com/twintproject/twint',
      features: ['Sem limite de API', 'Busca histórica', 'Extração de dados'],
      freeTier: 'Totalmente gratuito (Open Source)'
    },
    {
      name: 'Metagoofil',
      category: 'Documents',
      description: 'Extrai metadados de documentos públicos (PDF, DOC, XLS, PPT).',
      url: 'https://github.com/laramies/metagoofil',
      features: ['Análise de metadados', 'Extração de informações', 'Múltiplos formatos'],
      freeTier: 'Totalmente gratuito (Open Source)'
    },
    {
      name: 'Exiftool',
      category: 'Documents',
      description: 'Leitura, escrita e edição de metadados em arquivos de imagem e documentos.',
      url: 'https://exiftool.org',
      features: ['Análise de EXIF', 'Múltiplos formatos', 'Linha de comando'],
      freeTier: 'Totalmente gratuito'
    },
    {
      name: 'Creepy',
      category: 'Geolocation',
      description: 'Agregador de geolocalização a partir de redes sociais e imagens.',
      url: 'https://github.com/ilektrojohn/creepy',
      features: ['Geolocalização', 'Timeline de localizações', 'Mapeamento'],
      freeTier: 'Totalmente gratuito (Open Source)'
    },
    {
      name: 'Nmap',
      category: 'Network Intelligence',
      description: 'Scanner de rede para descoberta de hosts e auditoria de segurança.',
      url: 'https://nmap.org',
      features: ['Port scanning', 'Service detection', 'OS fingerprinting'],
      freeTier: 'Totalmente gratuito (Open Source)'
    },
    {
      name: 'Sherlock',
      category: 'Social Media',
      description: 'Busca de usernames em mais de 300 redes sociais.',
      url: 'https://github.com/sherlock-project/sherlock',
      features: ['Busca massiva', 'Rápido e eficiente', 'Múltiplas plataformas'],
      freeTier: 'Totalmente gratuito (Open Source)'
    },
    {
      name: 'Whatsmyname',
      category: 'Social Media',
      description: 'Enumeração de usernames em múltiplos sites.',
      url: 'https://github.com/WebBreacher/WhatsMyName',
      features: ['Base atualizada', 'Web interface', 'API disponível'],
      freeTier: 'Totalmente gratuito (Open Source)'
    },
    {
      name: 'GitLeaks',
      category: 'Code Intelligence',
      description: 'Scanner de segredos e credenciais em repositórios Git.',
      url: 'https://github.com/gitleaks/gitleaks',
      features: ['Detecção de secrets', 'Scan de commits', 'CI/CD integration'],
      freeTier: 'Totalmente gratuito (Open Source)'
    }
  ]

  const categories = ['all', ...new Set(osintTools.map(tool => tool.category))].sort()

  const filteredTools = osintTools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Head>
        <title>Melhores Ferramentas OSINT Gratuitas 2025</title>
        <meta name="description" content="Lista completa das melhores ferramentas OSINT gratuitas disponíveis em 2025" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔍</text></svg>" />
      </Head>

      <div className="container">
        <header>
          <h1>🔍 Melhores Ferramentas OSINT Gratuitas 2025</h1>
          <p className="subtitle">Open Source Intelligence Tools - Seleção das ferramentas defensivas mais poderosas</p>
        </header>

        <div className="controls">
          <input
            type="text"
            placeholder="🔎 Buscar ferramentas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category === 'all' ? 'Todas' : category}
              </button>
            ))}
          </div>
        </div>

        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">{filteredTools.length}</div>
            <div className="stat-label">Ferramentas</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{categories.length - 1}</div>
            <div className="stat-label">Categorias</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Gratuitas</div>
          </div>
        </div>

        <div className="tools-grid">
          {filteredTools.map((tool, index) => (
            <div key={index} className="tool-card">
              <div className="tool-header">
                <h3>{tool.name}</h3>
                <span className="category-badge">{tool.category}</span>
              </div>

              <p className="tool-description">{tool.description}</p>

              <div className="features">
                {tool.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">✓ {feature}</span>
                ))}
              </div>

              <div className="tool-footer">
                <span className="free-tier">🎁 {tool.freeTier}</span>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="visit-btn">
                  Visitar →
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="no-results">
            <p>Nenhuma ferramenta encontrada para "{searchTerm}"</p>
          </div>
        )}

        <footer>
          <p>⚠️ Uso Ético: Estas ferramentas devem ser usadas apenas para fins legítimos de segurança defensiva e pesquisa.</p>
          <p>📅 Atualizado em 2025 | Total: {osintTools.length} ferramentas gratuitas</p>
        </footer>
      </div>
    </>
  )
}
