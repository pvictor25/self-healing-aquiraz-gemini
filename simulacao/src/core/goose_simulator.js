/**
 * @file goose_simulator.js
 * @brief Simulador de eventos discretos, mensagens GOOSE (IEC 61850), Seletividade Lógica e 50BF.
 * Projeto: self-healing-aquiraz-gemini
 */

(function (global) {
  'use strict';

  const SH = global.SH || (global.SH = {});

  const GOOSE_DEFAULTS = {
    breakerTime: 0.05,       // tempo de interrupção do disjuntor (50 ms)
    gooseLatency: 0.003,     // latência de classe TT6 (3 ms)
    relayDelay: 0.013,       // calibração de processamento do SEL-751 (13 ms)
    sl: true,                // Seletividade Lógica ativa
    bf: true,                // Proteção 50BF ativa
    bfd: 0.20,               // temporizador BFD (200 ms)
    slBlocks51: true,        // solução do TCC: bloqueio estendido ao 51
    backupAdder: 0.20,       // somador de retaguarda (+200 ms)
    commFail: false,         // perda de pacotes GOOSE (false | 'all' | 'SL' | 'BF')
    slQuality: true,         // supervisão de qualidade de sinal GOOSE (Fig. 3.8)
  };

  function createGooseMessage(from, to, kind, value, seq = 0) {
    return {
      from,
      to,
      kind,   // 'SL' (Bloqueio) ou 'BF' (Trip Remoto)
      value,  // boolean
      seq,
      dataset: kind === 'SL' ? `CFG.LLN0.SL_${from}` : `CFG.LLN0.Trip_50BF_${from}`,
      ln: kind === 'SL' ? 'PRO.P1TPIOC1.Str.general' : 'PRO.BFR1RBRF1.OpEx.general',
    };
  }

  const api = { GOOSE_DEFAULTS, createGooseMessage };
  SH.goose = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);

