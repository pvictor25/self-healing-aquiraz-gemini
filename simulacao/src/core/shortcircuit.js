/**
 * @file shortcircuit.js
 * @brief Cálculo de curto-circuito pelo método das componentes simétricas (Equações 2.18 a 2.20 do TCC).
 * Projeto: self-healing-aquiraz-gemini
 */

(function (global) {
  'use strict';

  const SH = global.SH || (global.SH = {});
  const C = SH.complex || (typeof require !== 'undefined' ? require('./complex.js') : null);

  const FAULT_TYPES = {
    '3F': { label: 'Trifásica (3F)', phases: 3, ground: false },
    '2F': { label: 'Bifásica (2F)', phases: 2, ground: false },
    'FT': { label: 'Fase-Terra Franca (FT)', phases: 1, ground: true },
    'FTm': { label: 'Fase-Terra Mínima (FTm, Rc = 100 Ω)', phases: 1, ground: true },
  };

  /**
   * Calcula as correntes de curto (A primários) a partir das impedâncias Thévenin em pu.
   */
  function currents(model, z1, z0, rfOhm = 0) {
    const ib = model.ibase;
    const rf = rfOhm / model.zbase;
    const rcMin = (model.scn.ftMinOhms != null ? model.scn.ftMinOhms : 100) / model.zbase;

    // 3F: I = V / |Z1 + Rf|
    const z1rf = C.add(z1, C.c(rf, 0));
    const i3f = ib / C.abs(z1rf);

    // 2F: I = √3 * V / |2*Z1 + Rf|
    const twoZ1 = C.scale(z1, 2);
    const i2f = (Math.sqrt(3) * ib) / C.abs(C.add(twoZ1, C.c(rf, 0)));

    // FT: I = 3 * V / |2*Z1 + Z0 + 3*Rf|
    const sumFT = C.add(twoZ1, z0);
    const ift = (3 * ib) / C.abs(C.add(sumFT, C.c(3 * rf, 0)));

    // FTm: FT com resistência de contato Rc (100 Ω no TCC)
    const iftm = (3 * ib) / C.abs(C.add(sumFT, C.c(3 * rcMin, 0)));

    return { i3f, i2f, ift, iftm };
  }

  /**
   * Curto ao final de um caminho de trechos a partir de uma fonte (validação contra Tabela 4.7).
   */
  function pathFault(model, sourceId, segIds) {
    const src = model.sources[sourceId];
    let z1 = src.z1;
    let z0 = src.z0;

    segIds.forEach((id) => {
      const s = model.segments[id];
      if (s) {
        z1 = C.add(z1, s.z1);
        z0 = C.add(z0, s.z0);
      }
    });

    return currents(model, z1, z0, 0);
  }

  const api = { FAULT_TYPES, currents, pathFault };
  SH.shortcircuit = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);

