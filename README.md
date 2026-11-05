# self-healing-aquiraz-gemini

> **Simulador Web de Self-Healing em Redes Elétricas Inteligentes — SE Aquiraz**  
> Projeto de pesquisa científica e desenvolvimento assistido por Inteligência Artificial (Google Gemini).

---

## Identificação do Projeto

- **Artigo Alvo:** *Desenvolvimento de Simuladores Web de Self-Healing Assistido por Inteligência Artificial: Estudo Comparativo entre Gemini e Claude*
- **Periódico Alvo:** *Journal of Control, Automation and Electrical Systems* (Springer)
- **Instituição:** Universidade Federal do Ceará (UFC) — Centro de Tecnologia — Departamento de Engenharia Elétrica
- **Disciplina:** THP7244 – EEEE II – REI: Proteção de Sistemas Elétricos Inteligentes
- **Orientadores:** Raimundo Furtado Sampaio, Lucas Silveira Melo
- **Equipe 2 (Desenvolvimento em Gemini):** Paulo Victor Pereira Lima, Lucas Sales

---

## Estrutura do Repositório

```text
self-healing-aquiraz-gemini/
│
├── .gitignore                          # Regras de exclusão (ignora caches e dados brutos pesados)
│
├── .vscode/
│   └── settings.json                   # Configuração de preview local do VS Code
│
├── documentacao/
│   ├── CONTEXTO_E_ESPECIFICACAO_PROJETO.md      # Especificação técnica e acadêmica do projeto
│   └── PLANO_IMPLEMENTACAO_RECURSOS_SIMULADOR.md # Plano de engenharia detalhado para paridade/evolução
│
├── fontes/                             # Artigos e monografias de referência essenciais
│   ├── Tarefa Classroom.pdf            # Diretrizes e divisão de equipes da disciplina
│   └── TCC_MarioSergio_2015_pós defesa (revisão 3).pdf # Monografia de base (SE Aquiraz)
│   *(Nota: a pasta de ensaios e dados brutos locais 'TCC Mario Sergio' é mantida apenas localmente e excluída do Git por limite de tamanho)*
│
├── simulacao/
│   ├── diagrama_unifilar_se_aqz.html   # Simulador Web Principal (Single Page Application autossuficiente)
│   │
│   ├── src/                            # Módulos em desenvolvimento do simulador
│   │   ├── core/                       # Motores de cálculo: curto-circuito, proteção SEL-751, GOOSE e FLISR
│   │   ├── data/                       # [Diferencial Gemini] Modelos e parametrizações 100% em JSON puro
│   │   │   ├── aquiraz_tcc2015.json    # Rede principal completa da Fig. 4.2 do TCC (Rodrigues, 2015)
│   │   │   ├── aquiraz_nobre2013.json  # Primeira topologia histórica da Fig. 4.1 (Nobre, 2013)
│   │   │   ├── catalogo_cabos.json     # Catálogo padronizado de condutores e ampacidades térmicas
│   │   │   ├── ensaios_lab.json        # Bancada de validação dos ensaios da mala CONPROVE CE-6006
│   │   │   └── schema_rede.json        # JSON Schema formal para validação e importação de novas redes
│   │   └── ui/                         # Renderização SVG unifilar, coordenogramas e diagramas Sequenc
│   │
│   └── tests/                          # Suíte de testes automatizados e validação numérica (Tabs. 4.7 e 4.8)
│
├── tools/
│   ├── build_single_file.py            # Script utilitário para empacotamento dos módulos em SPA única
│   └── validar_json_rede.py            # Validador de integridade e consistência elétrica dos arquivos JSON
│
└── README.md                           # Apresentação e guia rápido do projeto
```

---

## Como Executar o Simulador no VS Code

1. Instale a extensão oficial **Live Preview** (Microsoft) no VS Code (`Ctrl + Shift + X` -> busque por `Live Preview`).
2. Abra o arquivo [`simulacao/diagrama_unifilar_se_aqz.html`](file:///c:/Users/pvict/OneDrive/self-healing-aquiraz-gemini/simulacao/diagrama_unifilar_se_aqz.html).
3. Clique com o botão direito no editor e selecione **"Live Preview: Show Preview"** (ou use o atalho no canto superior direito).
4. O diagrama unifilar interativo abrirá diretamente em uma aba ao lado do seu código.

---

## Documentação Técnica Completa

- Para detalhes sobre a rede piloto, alimentadores (21I7, 21I6, 21I5, 21I4), ampacidade e filosofia IEC 61850: consulte [CONTEXTO_E_ESPECIFICACAO_PROJETO.md](file:///c:/Users/pvict/OneDrive/self-healing-aquiraz-gemini/documentacao/CONTEXTO_E_ESPECIFICACAO_PROJETO.md).
- Para o cronograma de paridade de recursos, modelagem matemática do SEL-751, GOOSE, SRA e bancada de validação: consulte [PLANO_IMPLEMENTACAO_RECURSOS_SIMULADOR.md](file:///c:/Users/pvict/OneDrive/self-healing-aquiraz-gemini/documentacao/PLANO_IMPLEMENTACAO_RECURSOS_SIMULADOR.md).
