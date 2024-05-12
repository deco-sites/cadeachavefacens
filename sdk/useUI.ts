/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";
import { Historico } from "deco-sites/cadeachavefacens/loaders/Historic/ClassHistoric.ts";
import { Sala } from "deco-sites/cadeachavefacens/actions/Salas/getListSalas.ts";

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const token = signal("");
const historico = signal<Historico[] | null>(null);
const salas = signal<Sala[] | null>(null);

const state = {
  displayCart,
  displayMenu,
  displaySearchPopup,
  displaySearchDrawer,
  token,
  historico,
  salas,
};

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

export const useUI = () => state;
