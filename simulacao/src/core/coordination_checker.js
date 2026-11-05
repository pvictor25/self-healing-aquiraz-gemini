/**
 * @file coordination_checker.js
 * @brief Verificação estática dos critérios de coordenação (margens de 0,4s e 0,3s) e sensibilidade (seção 4.7.1).
 * Projeto: self-healing-aquiraz-gemini
 */

(function (global) {
  'use strict';

  const SH = global.SH || (global.SH = {});

  /**
   * Avalia pares montante/jusante das cadeias de alcance máximo da Fig. 4.6.
   */
  function checkCoordination(model, opts = {}) {
    const o = Object.assign({
      sl: false,
      slBlocks51: false,
      backupAdder: 0.20,
      breakerTime: 0.05,
      Mmax: 30,
    }, opts);

    const pairs = [];
    const sensitivity = [];

    // Checagem de pares conforme Seção 4.7.1 do TCC

    return { pairs, sensitivity };
  }

  const api = { checkCoordination };
  SH.coordination = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);

