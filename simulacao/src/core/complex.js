/**
 * @file complex.js
 * @brief Aritmética de números complexos para cálculos fasoriais e impedâncias em sistemas de potência.
 * Projeto: self-healing-aquiraz-gemini
 */

(function (global) {
  'use strict';

  const SH = global.SH || (global.SH = {});

  /**
   * Cria um número complexo.
   * @param {number} re Parte real
   * @param {number} im Parte imaginária
   * @returns {{re: number, im: number}}
   */
  function c(re = 0, im = 0) {
    return { re: Number(re) || 0, im: Number(im) || 0 };
  }

  function add(a, b) {
    return { re: a.re + b.re, im: a.im + b.im };
  }

  function sub(a, b) {
    return { re: a.re - b.re, im: a.im - b.im };
  }

  function scale(a, s) {
    return { re: a.re * s, im: a.im * s };
  }

  function mul(a, b) {
    return {
      re: a.re * b.re - a.im * b.im,
      im: a.re * b.im + a.im * b.re,
    };
  }

  function abs(a) {
    return Math.hypot(a.re, a.im);
  }

  function inv(a) {
    const d = a.re * a.re + a.im * a.im;
    if (d === 0) return { re: Infinity, im: Infinity };
    return { re: a.re / d, im: -a.im / d };
  }

  function div(a, b) {
    return mul(a, inv(b));
  }

  function fmt(a, decimals = 4) {
    const sign = a.im >= 0 ? '+' : '-';
    return `${a.re.toFixed(decimals)} ${sign} j${Math.abs(a.im).toFixed(decimals)}`;
  }

  const api = { c, add, sub, scale, mul, abs, inv, div, fmt };
  SH.complex = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);

