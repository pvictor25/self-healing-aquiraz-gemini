/**
 * @file protection.js
 * @brief Modelo de relés microprocessados (SEL-751), curvas IEC/IEEE, saturação Mmax=30 e ciclos de religamento (ANSI 79).
 * Projeto: self-healing-aquiraz-gemini
 */

(function (global) {
  'use strict';

  const SH = global.SH || (global.SH = {});

  const CURVES = {
    NI: { name: 'IEC Normalmente Inversa', beta: 0.14, alpha: 0.02, L: 0 },
    MI: { name: 'IEC Muito Inversa', beta: 13.5, alpha: 1.0, L: 0 },
    VI: { name: 'IEC Muito Inversa', beta: 13.5, alpha: 1.0, L: 0 },
    EI: { name: 'IEC Extremamente Inversa', beta: 80.0, alpha: 2.0, L: 0 },
    LI: { name: 'IEC Inversa Longa', beta: 120.0, alpha: 1.0, L: 0 },
    IEEE_MI: { name: 'IEEE Moderadamente Inversa', beta: 0.0515, alpha: 0.02, L: 0.114 },
    IEEE_VI: { name: 'IEEE Muito Inversa', beta: 19.61, alpha: 2.0, L: 0.491 },
    IEEE_EI: { name: 'IEEE Extremamente Inversa', beta: 28.2, alpha: 2.0, L: 0.1217 },
  };

  /**
   * Tempo de atuação por curva inversa (IEC 60255 / IEEE C37.112) com saturação Mmax = 30.
   */
  function curveTime(curve, dial, M, Mmax = 30) {
    if (!(M > 1)) return Infinity;
    const c = CURVES[curve] || CURVES.MI;
    const m = Math.min(M, Mmax);
    return dial * (c.beta / (Math.pow(m, c.alpha) - 1) + (c.L || 0));
  }

  /**
   * Converte a notação de ciclo do TCC em operações.
   * SE: '1I+2T' com notação 'religamentos' -> ['I', 'I', 'T', 'T'] (4 disparos).
   * Linha: '3I' -> ['I', 'I', 'I'] (3 disparos).
   */
  function parseCycle(cycle, notation = 'aberturas') {
    if (Array.isArray(cycle)) return cycle.slice();
    if (!cycle || /bloq/i.test(cycle)) return ['I'];

    if (notation === 'religamentos') {
      return ['I'].concat(parseCycle(cycle, 'aberturas'));
    }

    const ops = [];
    String(cycle).split('+').forEach((part) => {
      const m = part.trim().match(/^(\d+)\s*([IT])$/i);
      if (m) {
        for (let i = 0; i < Number(m[1]); i++) ops.push(m[2].toUpperCase());
      }
    });
    return ops.length ? ops : ['I'];
  }

  /**
   * Seleção automática de grupo de ajuste (SIAP).
   */
  function selectGroup(cfg, upNode, ctx) {
    const groups = cfg.groups || [];
    const cause = ctx && ctx.cause;

    for (const g of groups) {
      if (!g.when) continue;
      let match = true;
      if (g.when.upstreamNode) match = match && upNode === g.when.upstreamNode;
      if (g.when.cause) match = match && !!cause && g.when.cause.includes(cause);
      if (match) return g;
    }
    return groups.find((g) => !g.when) || groups[0];
  }

  const api = { CURVES, curveTime, parseCycle, selectGroup };
  SH.protection = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);

