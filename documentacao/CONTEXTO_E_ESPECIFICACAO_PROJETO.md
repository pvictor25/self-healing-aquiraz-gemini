# Simulador Web de Self-Healing da SE Aquiraz — Equipe Gemini

**Projeto Acadêmico e Científico:** Desenvolvimento de Simuladores Web de Self-Healing Assistido por Inteligência Artificial: Estudo Comparativo entre Gemini e Claude  
**Veículo Alvo de Publicação:** *Journal of Control, Automation and Electrical Systems* (Springer)  
**Instituição:** Universidade Federal do Ceará (UFC) — Centro de Tecnologia — Departamento de Engenharia Elétrica  
**Disciplina:** THP7244 – EEEE II – REI: Proteção de Sistemas Elétricos Inteligentes  
**Docente Responsável / Orientador:** Prof. Raimundo Furtado Sampaio, M.Sc., Ph.D.  
**Autor e Desenvolvedor:** Paulo Victor Pereira Lima (Equipe 2 - Gemini, em colaboração com Lucas)

---

## 1. Visão Geral e Contexto do Projeto

Este projeto consiste no desenvolvimento de uma aplicação web interativa capaz de simular a rede de distribuição de média tensão (13,8 kV) associada à **Subestação de Aquiraz (SE AQZ 69/13,8 kV)**, no Ceará, contemplando as funções de automação de redes inteligentes (*Smart Grid*), especificamente:
- **Self-Healing / FLISR** (*Fault Location, Isolation and Service Restoration*);
- **SRA** (Sistema de Recomposição Automática);
- **Seletividade Lógica** e coordenação por ciclo de religamento;
- **Proteção contra Falha de Disjuntor (50BF)** com comunicação de alta velocidade baseada na norma **IEC 61850 (mensagens GOOSE)**.

O desenvolvimento deste simulador faz parte de uma pesquisa científica comparativa conduzida na UFC, avaliando o desempenho e a qualidade de desenvolvimento assistido por Inteligência Artificial generativa (**Google Gemini** vs. **Anthropic Claude**) para a geração de ferramentas interativas de engenharia de potência.

---

## 2. Divisão de Equipes e Escopo de Trabalho

Conforme as diretrizes da disciplina e do plano do artigo científico:

| Equipe | Atribuição | Integrantes |
| :--- | :--- | :--- |
| **Equipe 1** | Revisão Bibliográfica, Estrutura Teórica e Escrita do Artigo | Mário Sérgio, Jean, Milena e Lucas |
| **Equipe 2** | **Desenvolvimento do Simulador Web via Gemini** | **Paulo Victor Pereira Lima**, Lucas |
| **Equipe 3** | Desenvolvimento do Simulador Web via Claude | Douglas, Júlio e Kênio |

O presente repositório é o ambiente oficial de trabalho de **Paulo Victor Pereira Lima (Equipe 2 - Gemini)**.

---

## 3. Fundamentação Técnica e Histórico do Sistema

A base técnica e os parâmetros modelados no simulador derivam diretamente do trabalho pioneiro de **Mário Sérgio de Lima Rodrigues (UFC, 2015)**:
> *“Teste e Validação das Funções de Proteção baseadas na Norma IEC 61850 Propostas para Implantação no Projeto Piloto da Rede de Distribuição Inteligente de Aquiraz”*  
> (Orientação: Prof. Raimundo Furtado Sampaio; Coorientação: Prof. Lucas Silveira Melo).

### 3.1. A Rede Piloto de Distribuição Inteligente de Aquiraz
Implantada pela concessionária local (**COELCE**, atual **Enel Distribuição Ceará**), a rede inteligente de Aquiraz compreende:
- Aproximadamente 20.000 unidades consumidoras atendidas;
- Extensão aproximada de 225 km de rede em 13,8 kV;
- Cobertura da sede de Aquiraz e dos distritos: Catu, Picão, Prainha, Japão, Porto das Dunas, Tupuiú, Timbú, Mangabeira, Tapuiocatolé e Coaçu;
- Três subestações interconectadas em anel aberto (operação radial com socorro mútuo):
  1. **SE Aquiraz (SE AQZ 69/13,8 kV)** — subestação fonte principal com dois transformadores (T1 e T2 de 10/12,5/15 MVA);
  2. **SE Eusébio (SE ESB 69/13,8 kV)**;
  3. **SE Água Fria (SE AGF 69/13,8 kV)**.

### 3.2. Topologia dos Alimentadores em Estudo
A partir do barramento de média tensão da SE AQZ partem quatro alimentadores troncais de 13,8 kV participantes do sistema automatizado:
1. **Alimentador 21I7 (AQ7):** interliga-se à SE ESB através do religador de interligação **RL1** (normalmente aberto); possui chaves/religadores seccionalizadores RS1, RS3 e o disjuntor de fronteira 21S7.
2. **Alimentador 21I6 (AQ6):** interliga-se à SE ESB através do religador **RL2** (normalmente aberto); possui RS2 e interliga-se a ramais de socorro.
3. **Alimentador 21I5 (AQ5):** interliga-se à SE ESB através do religador **RL3** (normalmente aberto); possui RS4 (trecho com impedância diferenciada).
4. **Alimentador 21I4 (AQ4):** interliga-se à SE AGF através do religador **RL4** (normalmente aberto); possui os seccionalizadores RS5, RS6 e RS7, e o disjuntor 21I2 na SE AGF.

### 3.3. Características dos Condutores e Limites Operacionais
Para que a recomposição (*self-healing*) ocorra com total segurança operacional, a corrente pós-recomposição não pode exceder a capacidade térmica nominal dos condutores:
- **CAA Partridge 266,8 MCM:** Ampacidade de **475 A**;
- **CAA Poppy 1/0 AWG:** Ampacidade de **242 A**;
- **Cobre Nu 95 mm²:** Ampacidade de **438 A**;
- **Spacer Cable (Rede Compactada) 240 mm²:** Ampacidade de **617 A**.

---

## 4. Filosofia de Proteção e Automação (IEC 61850)

### 4.1. Equipamentos e IEDs Considerados
- **Relés de Proteção Numéricos (IEDs):** Família **SEL-751** (Schweitzer Engineering Laboratories);
- **Equipamentos de Teste:** Mala microprocessada de injeção secundária **CONPROVE CE-6006** e switch industrial **SEL-2730M**;
- **Funções ANSI Ativas:**
  - `50/51P`: Sobrecorrente de fase instantânea e temporizada (curvas IEC Muito Inversa - MI e Normalmente Inversa - NI);
  - `50/51N`: Sobrecorrente de neutro instantânea e temporizada;
  - `50BF`: Proteção contra Falha de Disjuntor (*Breaker Failure*);
  - `79`: Ciclo de religamento automático (ex.: 1 operação instantânea e 2 temporizadas na SE; ciclos coordenados ao longo do alimentador).

### 4.2. Seletividade Lógica e Mensagens GOOSE
Na coordenação temporizada tradicional de alimentadores radiais, faltas próximas ao barramento da subestação (*close-in*) podem levar de 400 a 600 ms para serem eliminadas caso o elemento instantâneo da barra precise ser temporizado para coordenar com os alimentadores a jusante.

Com a **Seletividade Lógica via mensagens GOOSE**:
- Quando ocorre uma falta num alimentador a jusante, o IED do alimentador detecta o *pick-up* de sobrecorrente e publica instantaneamente um evento **GOOSE de bloqueio** para o relé de montante (disjuntor geral de barra AQZ_MT);
- O relé de montante retarda sua atuação rápida apenas o tempo necessário (degrau de 50 a 100 ms). Se a falta for estritamente na barra (nenhum IED a jusante enviou bloqueio), o relé de montante opera instantaneamente (~100 ms);
- Se o disjuntor do alimentador falhar em abrir após o disparo de abertura (*trip*), a função **50BF** envia via GOOSE um comando de trip remoto (*REMTRIP*) para abrir o disjuntor de retaguarda em apenas ~200 ms, impedindo que a falta danifique o transformador de potência.

---

## 5. Arquitetura do Simulador Web (Equipe Gemini)

O simulador web encontra-se em [`simulacao/diagrama_unifilar_se_aqz.html`](file:///c:/Users/pvict/OneDrive/self-healing-aquiraz-gemini/simulacao/diagrama_unifilar_se_aqz.html). Ele é estruturado como uma Single-Page Application (SPA) autossuficiente e de execução instantânea diretamente no navegador ou via VS Code Live Preview, com desenvolvimento modular na pasta `simulacao/src/`.

### 5.1. Funcionalidades Atuais Implementadas
1. **Diagrama Unifilar Vetorial (SVG Nativo):**
   - Representação esquemática dos barramentos 69 kV e 13,8 kV da SE AQZ;
   - Traçado dos 4 alimentadores (21I7, 21I6, 21I5, 21I4), trechos de linha com distâncias em metros e pontos de encontro com SE ESB e SE AGF;
   - Estado dinâmico dos disjuntores e religadores (Verde = Aberto, Vermelho = Fechado).
2. **Modos Interativos da Barra de Ferramentas:**
   - **Introduzir Falta:** Permite ao usuário clicar sobre qualquer trecho da linha (T1 a T16) para simular um curto-circuito no local;
   - **Remover Falta:** Remove os pontos de defeito inseridos na rede;
   - **Manobrar Disjuntores:** Permite a operação manual pontual dos equipamentos (abertura/fechamento);
   - **Desfazer / Refazer (Undo / Redo):** Histórico completo de manobras e estados elétricos (`Ctrl+Z` e `Ctrl+Y`);
   - **Exibição de Comprimentos:** Alterna a visibilidade dos rótulos de extensão das linhas;
   - **Restaurar Topologia Padrão:** Reinicia a rede para a configuração operacional de referência (radial com religadores RL abertos);
   - **Exportação de Imagem:** Geração de arquivo PNG da topologia atual em alta resolução.

### 5.2. Plano de Evolução e Paridade Técnica
Para o detalhamento completo dos requisitos matemáticos, implementação dos modelos SEL-751 (50/51/79/50BF), mensagens GOOSE, FLISR com restrição de ampacidade/divisão de ilhas e validação contra os ensaios do TCC e da mala CONPROVE CE-6006, consulte o documento de engenharia:
- [PLANO_IMPLEMENTACAO_RECURSOS_SIMULADOR.md](file:///c:/Users/pvict/OneDrive/self-healing-aquiraz-gemini/documentacao/PLANO_IMPLEMENTACAO_RECURSOS_SIMULADOR.md)

---

## 6. Padronização e Nomenclatura do Projeto

Para conferir identidade profissional e rigor científico ao projeto desenvolvido pela Equipe 2 (Paulo Victor e Lucas), foi selecionado o nome:

> **`self-healing-aquiraz-gemini`**  
> *(Simulador Web de Self-Healing em Redes Elétricas Inteligentes — SE Aquiraz)*

### Justificativa da Nomenclatura:
- **`self-healing`**: Identifica diretamente o tema central da pesquisa e do artigo científico (*FLISR / recomposição automática*);
- **`aquiraz`**: Referencia o sistema elétrico real e os alimentadores da Subestação Aquiraz (caso de estudo empírico);
- **`gemini`**: Distingue claramente o desenvolvimento da Equipe 2 para os fins do estudo comparativo com o modelo desenvolvido na Equipe 3 (Claude).

