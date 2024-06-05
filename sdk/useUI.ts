/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";
import { Response } from "deco-sites/cadeachavefacens/loaders/Historic/ClassHistoric.ts";
import { Sala } from "deco-sites/cadeachavefacens/actions/Salas/getListSalas.ts";
import { Professor } from "deco-sites/cadeachavefacens/actions/Professor/getListProfessores.ts";

interface Filter {
  professorId?: number;
  salaId?: number;
  abriu?: boolean;
  dataInicial: string;
  dataFinal: string;
  totalElements?: number;
}

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const token = signal("");
const historico = signal<Response | null>(null);
const salas = signal<Sala[] | null>(null);
const professores = signal<Professor[] | null>(null);
const loading = signal<boolean>(true);
const role = signal<"user" | "admin" | "">("");
const filter = signal<Filter | null>(null);

const state = {
  displayCart,
  displayMenu,
  displaySearchPopup,
  displaySearchDrawer,
  token,
  historico,
  salas,
  professores,
  loading,
  role,
  filter,
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
