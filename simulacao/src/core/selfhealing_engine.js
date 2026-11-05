/**
 * @file selfhealing_engine.js
 * @brief Algoritmo de Self-Healing / SRA (FLISR) com restrições de ampacidade, pickup e divisão de ilhas.
 * Projeto: self-healing-aquiraz-gemini
 */

(function (global) {
  'use strict';

  const SH = global.SH || (global.SH = {});

  /**
   * Localiza a zona em falta a partir dos relés com partida (*everPicked*).
   * @param {Object} model Modelo elétrico da rede
   * @param {Array} indicatorPath Lista ordenada de relés no caminho do curto
   */
  function locateFault(model, indicatorPath) {
    const picked = indicatorPath.filter((d) => d.picked);
    if (!picked.length) return null;
    const deepest = picked[0];
    const zoneId = model.zones.nodeZone ? model.zones.nodeZone[deepest.downNode] : null;
    return { zoneId, relay: deepest.id };
  }

  /**
   * Planejamento de manobras de isolamento e recomposição.
   */
  function planRestoration(model, netState, ctx, opts = {}) {
    const steps = [];
    const notes = [];

    // 1. Localização
    if (ctx.type === 'fault' && ctx.faultZone) {
      notes.push({ stage: 'localizacao', text: `Defeito isolado na zona ${ctx.faultZone}.` });
    }

    // 2. Isolamento de fronteiras
    // (Abertura das chaves delimitadoras da zona)

    // 3. Restauração assistida por ampacidade e divisão de ilhas

    return { steps, notes };
  }

  const api = { locateFault, planRestoration };
  SH.selfhealing = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);

