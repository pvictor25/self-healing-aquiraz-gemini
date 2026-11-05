/**
 * @file control_panels.js
 * @brief Gestão das 8 abas de controle lateral do simulador (Falta, Eventos, Análises, Proteção, IEC 61850, Ensaios, Fontes, Guia).
 * Projeto: self-healing-aquiraz-gemini
 */

(function (global) {
  'use strict';

  const SH = global.SH || (global.SH = {});
  SH.ui = SH.ui || {};

  const TABS = [
    { id: 'falta', label: 'Falta' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'analises', label: 'Análises' },
    { id: 'protecao', label: 'Proteção' },
    { id: 'iec', label: 'IEC 61850' },
    { id: 'ensaios', label: 'Ensaios' },
    { id: 'fontes', label: 'Fontes' },
    { id: 'guia', label: 'Guia' },
  ];

  function renderPanel(tabId, container, appState) {
    // Renderiza o conteúdo dinâmico da aba selecionada
  }

  SH.ui.panels = { TABS, renderPanel };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SH.ui.panels;
  }
})(typeof window !== 'undefined' ? window : globalThis);

