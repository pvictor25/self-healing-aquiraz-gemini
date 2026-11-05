/**
 * @file network.js
 * @brief Topologia de rede, grafo elétrico radial, busca de caminhos, zonas de proteção e cálculo de fluxo.
 * Projeto: self-healing-aquiraz-gemini
 */

(function (global) {
  'use strict';

  const SH = global.SH || (global.SH = {});
  const C = SH.complex || (typeof require !== 'undefined' ? require('./complex.js') : null);

  /**
   * Constrói o modelo operacional indexado a partir da definição de cenário.
   */
  function buildModel(scn) {
    const sbase = scn.sbaseMVA || 100;
    const vbase = scn.vbaseKV || 13.8;
    const ibase = (sbase * 1000) / (Math.sqrt(3) * vbase);
    const zbase = (vbase * vbase) / sbase;

    const nodes = {};
    Object.entries(scn.nodes).forEach(([id, n]) => {
      nodes[id] = Object.assign({ id }, n);
    });

    const segments = {};
    Object.entries(scn.segments).forEach(([id, s]) => {
      const seg = Object.assign({ id }, s);
      if (!seg.z1 && seg.cable) {
        let r1 = 0, x1 = 0, r0 = 0, x0 = 0;
        seg.cable.forEach(([cab, len]) => {
          const cinfo = scn.cables[cab];
          if (cinfo) {
            r1 += (cinfo.r1 * len) / 1000;
            x1 += (cinfo.x1 * len) / 1000;
            r0 += (cinfo.r0 * len) / 1000;
            x0 += (cinfo.x0 * len) / 1000;
          }
        });
        seg.z1 = C.c(r1 / zbase, x1 / zbase);
        seg.z0 = C.c(r0 / zbase, x0 / zbase);
      } else {
        seg.z1 = C.c(s.z1.re, s.z1.im);
        seg.z0 = C.c(s.z0.re, s.z0.im);
      }
      segments[id] = seg;
    });

    const switches = {};
    Object.entries(scn.switches).forEach(([id, sw]) => {
      switches[id] = Object.assign({ id }, sw);
    });

    const sources = {};
    Object.entries(scn.sources).forEach(([id, src]) => {
      sources[id] = Object.assign({ id }, src, {
        z1: C.c(src.z1.re, src.z1.im),
        z0: C.c(src.z0.re, src.z0.im),
      });
    });

    return {
      scn,
      sbase,
      vbase,
      ibase,
      zbase,
      nodes,
      segments,
      switches,
      sources,
      relays: scn.relays || {},
      zones: scn.zones || {},
    };
  }

  function normalState(model) {
    const sw = {};
    Object.values(model.switches).forEach((w) => {
      sw[w.id] = { closed: !!w.normallyClosed, stuck: false, locked: false };
    });
    const srcOn = {};
    Object.values(model.sources).forEach((s) => {
      srcOn[s.id] = true;
    });
    return { sw, srcOn };
  }

  function cloneState(st) {
    const sw = {};
    Object.entries(st.sw).forEach(([k, v]) => {
      sw[k] = Object.assign({}, v);
    });
    const srcOn = Object.assign({}, st.srcOn);
    return { sw, srcOn };
  }

  const api = { buildModel, normalState, cloneState };
  SH.network = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);

