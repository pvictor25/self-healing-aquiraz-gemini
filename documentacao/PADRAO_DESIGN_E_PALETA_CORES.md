# Padrão de Design e Paleta de Cores da Interface (v2.0 — Dual-Theme Didático)

> **Documento Normativo de Design System**  
> **Referência:** Estação de Trabalho Técnica Flat Dual-Theme (Tema Claro e Tema Escuro)  
> **Arquivo Estruturado (JSON):** [`simulacao/src/data/paleta_cores.json`](file:///c:/Users/pvict/OneDrive/self-healing-aquiraz-gemini/simulacao/src/data/paleta_cores.json)  
> **Projeto:** Simulador de Self-Healing SE Aquiraz (Gemini) &bull; Artigo Springer CAES

---

## 1. Princípios Fundamentais de Design

1. **Suporte Nativo a Dois Temas (`Tema Claro` e `Tema Escuro`)**:
   - A interface possui alternância instantânea entre **Tema Claro** (fundo técnico claro `#ffffff` / `#eef1f5`, ideal para leitura diurna, projeção em sala de aula e artigos impressos) e **Tema Escuro** (fundo técnico escuro `#16191e` / `#111317`, ideal para operação contínua com baixo cansaço visual).
2. **Simplicidade e Didática Visual**:
   - **Sem poluição de elementos secundários**: Foram removidos consoles de comando artificiais, barras de coordenadas `X/Y/Z` e caixas múltiplas desnecessárias. A tela concentra-se exclusivamente em:
     1. **Cabeçalho e Barra de Ferramentas Única** no topo;
     2. **Diagrama Unifilar Interativo** à esquerda;
     3. **Painel Didático em 2 Abas** à direita (*Passo a Passo* e *Dados Técnicos TCC*).
   - **Cores semânticas por estado elétrico**: Em vez de colorir cada alimentador com uma cor decorativa diferente, as linhas do diagrama unifilar mudam de cor e tracejado conforme o seu **estado elétrico em tempo real** (Energizado, Sem Tensão, Em Falta, Recomposto pelo Self-Healing).
3. **Zero Emojis e Zero Efeitos de Luz**:
   - Proibido o uso de emojis em qualquer texto ou rótulo da interface.
   - Proibido o uso de efeitos de brilho (`drop-shadow`, *glow*, neon ou animações pulsantes difusas). Todos os traços são planos (*flat*) com bordas ortogonais nítidas de `1px`.

---

## 2. Cores Semânticas do Diagrama Unifilar (Didática de Estados)

| Estado Elétrico do Trecho / Equipamento | Tema Claro (`light`) | Tema Escuro (`dark`) | Estilo Visual | Significado Didático |
| :--- | :--- | :--- | :--- | :--- |
| **Barramento Principal (69 / 13,8 kV)** | `#0f172a` | `#f0f6fc` | Sólido (`9px`) | Barras de subestação energizadas |
| **Trecho Energizado (Normal)** | `#1e293b` | `#d0d7de` | Sólido (`2.4px`) | Linha operando normalmente com tensão nominal |
| **Trecho Sem Tensão (Desenergizado)** | `#94a3b8` | `#484f58` | Tracejado (`6,4`) | Trecho desligado ou isolado sem alimentação |
| **Trecho em Falta (Curto-Circuito)** | `#dc2626` | `#f85149` | Sólido (`3.0px`) | Trecho onde ocorreu a falta e que foi isolado |
| **Trecho Recomposto (Self-Healing)** | `#0284c7` | `#38bdf8` | Sólido (`2.8px`) | Trecho são transferido para alimentador de socorro |
| **Chave Fechada (Conduzindo)** | `#dc2626` | `#ef4444` | Sólido + Borda | Disjuntor ou religador fechado (convenção ANSI/IEC) |
| **Chave Aberta (Seccionada)** | `#16a34a` | `#22c55e` | Sólido + Borda | Disjuntor ou religador aberto / seccionado |

---

## 3. Tokens de Superfícies, Bordas e Tipografia

### 3.1 Superfícies (`surfaces`)
| Token | Tema Claro (`light`) | Tema Escuro (`dark`) | Aplicação |
| :--- | :--- | :--- | :--- |
| `--bg-app` | `#eef1f5` | `#111317` | Plano de fundo geral da aplicação |
| `--bg-header` | `#ffffff` | `#1a1d23` | Barra de título superior |
| `--bg-toolbar` | `#f8f9fb` | `#21252b` | Barra de ferramentas de comandos |
| `--bg-viewport` | `#ffffff` | `#16191e` | Área gráfica do diagrama unifilar |
| `--grid-dots` | `#e2e8f0` | `#2a2f37` | Grade ortogonal discreta de referência |
| `--bg-panel` | `#ffffff` | `#1a1d23` | Painel lateral direito |
| `--bg-panel-header` | `#f1f5f9` | `#21252b` | Cabeçalho e abas do painel lateral |
| `--bg-card` | `#f8fafc` | `#14171c` | Cartões de métricas e tabelas técnicas |
| `--bg-step` | `#ffffff` | `#1e2229` | Cartões do passo a passo didático |

### 3.2 Bordas (`borders`) e Tipografia (`typography`)
| Token | Tema Claro (`light`) | Tema Escuro (`dark`) | Aplicação |
| :--- | :--- | :--- | :--- |
| `--border-subtle` | `#e2e8f0` | `#262b33` | Divisórias internas de linhas e tabelas |
| `--border-medium` | `#cbd5e1` | `#30363d` | Contorno de painéis, cartões e barra de ferramentas |
| `--border-strong` | `#94a3b8` | `#484f58` | Contorno de botões interativos |
| `--border-focus` | `#0284c7` | `#38bdf8` | Destaque de botão ativo ou etapa ativa |
| `--text-primary` | `#0f172a` | `#f0f6fc` | Títulos, siglas de chaves e valores principais |
| `--text-secondary` | `#334155` | `#c9d1d9` | Textos explicativos e rótulos de botões |
| `--text-muted` | `#64748b` | `#8b949e` | Cotas de comprimento (`m`) e legendas secundárias |
| `--text-accent` | `#0284c7` | `#38bdf8` | Destaques técnicos e indicadores de recomposição |
| `--text-numeric` | `#0f172a` | `#fef08a` | Grandezas elétricas calculadas (`A`, `ms`, `pu`) |

### 3.3 Badges de Status Operacional (`badges`)
| Estado | Tema Claro (`bg / border / text`) | Tema Escuro (`bg / border / text`) | Rótulo |
| :--- | :--- | :--- | :--- |
| **Normal** | `#dcfce7` / `#86efac` / `#15803d` | `#143521` / `#22c55e` / `#4ade80` | `REDE NORMAL` |
| **Falta** | `#fee2e2` / `#fca5a5` / `#b91c1c` | `#451010` / `#ef4444` / `#f87171` | `FALTA DETECTADA` |
| **Religamento** | `#fef3c7` / `#fde047` / `#b45309` | `#45300d` / `#eab308` / `#facc15` | `PROTECAO / ANSI 79` |
| **Bloqueio** | `#fee2e2` / `#f87171` / `#991b1b` | `#3b0d0d` / `#dc2626` / `#fca5a5` | `BLOQUEIO (LOCKOUT)` |
| **Self-Healing** | `#e0f2fe` / `#7dd3fc` / `#0369a1` | `#0c3554` / `#0284c7` / `#38bdf8` | `REDE RECOMPOSTA` |
