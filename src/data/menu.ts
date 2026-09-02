import macedoine from "@/assets/menu/macedoine.jpg";
import cesar from "@/assets/menu/cesar.jpg";
import soupeLentille from "@/assets/menu/soupe-lentille.jpg";
import soupeLegumesPoulet from "@/assets/menu/soupe-legumes-poulet.jpg";
import volAuVentPoulet from "@/assets/menu/vol-au-vent-poulet.jpg";
import volAuVentViande from "@/assets/menu/vol-au-vent-viande.jpg";
import lasagnes from "@/assets/menu/lasagnes.jpg";
import macAndCheese from "@/assets/menu/mac-and-cheese.jpg";
import cigareCrevettes from "@/assets/menu/cigare-crevettes.jpg";
import cigareViande from "@/assets/menu/cigare-viande.jpg";
import cigareEscalope from "@/assets/menu/cigare-escalope.jpg";
import galioFc from "@/assets/menu/galio-fc.jpg";
import fishAndChips from "@/assets/menu/fish-and-chips.jpg";
import sandwichEscalope from "@/assets/menu/sandwich-escalope.jpg";
import sandwichViande from "@/assets/menu/sandwich-viande.jpg";
import pizzaMargherita from "@/assets/menu/pizza-margherita.jpg";
import pizzaPepperoni from "@/assets/menu/pizza-pepperoni.jpg";
import pizzaChampignons from "@/assets/menu/pizza-champignons.jpg";
import pizzaThon from "@/assets/menu/pizza-thon.jpg";
import pizzaPesto from "@/assets/menu/pizza-pesto.jpg";
import pizzaFromage from "@/assets/menu/pizza-fromage.jpg";
import pizzaViande from "@/assets/menu/pizza-viande.jpg";
import pizzaPoulet from "@/assets/menu/pizza-poulet.jpg";
import pizzaCrevettes from "@/assets/menu/pizza-crevettes.jpg";
import pizzaVegetarien from "@/assets/menu/pizza-vegetarien.jpg";
import pizzaVeg from "@/assets/menu/pizza-veg.jpg";
import paniniFondu from "@/assets/menu/panini-fondu.jpg";
import paniniCamembert from "@/assets/menu/panini-camembert.jpg";
import paniniGruyere from "@/assets/menu/panini-gruyere.jpg";
import panini3Fromages from "@/assets/menu/panini-3-fromages.jpg";
import doubleSmash from "@/assets/menu/double-smash.jpg";
import tripleSmash from "@/assets/menu/triple-smash.jpg";
import quadrupleSmash from "@/assets/menu/quadruple-smash.jpg";
import fishBurger from "@/assets/menu/fish-burger.jpg";
import burgerCosmic from "@/assets/menu/burger-cosmic.jpg";
import burgerDolores from "@/assets/menu/burger-dolores.jpg";
import burgerOmega from "@/assets/menu/burger-omega.jpg";
import burgerDaenerys from "@/assets/menu/burger-daenerys.jpg";
import burgerIvern from "@/assets/menu/burger-ivern.jpg";
import burgerGalio from "@/assets/menu/burger-galio.jpg";
import burgerFromagio from "@/assets/menu/burger-fromagio.jpg";
import burgerGragas from "@/assets/menu/burger-gragas.jpg";
import tacosEscalope from "@/assets/menu/tacos-escalope.jpg";
import tacosViande from "@/assets/menu/tacos-viande.jpg";
import tacosAbat from "@/assets/menu/tacos-abat.jpg";
import tacosMerguez from "@/assets/menu/tacos-merguez.jpg";
import tacosCrispy from "@/assets/menu/tacos-crispy.jpg";
import poutineEscalope from "@/assets/menu/poutine-escalope.jpg";
import poutineAbat from "@/assets/menu/poutine-abat.jpg";
import poutineViande from "@/assets/menu/poutine-viande.jpg";
import poutineMerguez from "@/assets/menu/poutine-merguez.jpg";
import poutineTenders from "@/assets/menu/poutine-tenders.jpg";
import poutineCrevette from "@/assets/menu/poutine-crevette.jpg";
import bankaiPoulet from "@/assets/menu/bankai-poulet.jpg";
import bankaiViande from "@/assets/menu/bankai-viande.jpg";
import bankaiAbat from "@/assets/menu/bankai-abat.jpg";
import rizAuLait from "@/assets/menu/riz-au-lait.jpg";
import pavlova from "@/assets/menu/pavlova.jpg";
import cheesecake from "@/assets/menu/cheesecake.jpg";
import tiramisu from "@/assets/menu/tiramisu.jpg";
import cremeBrulee from "@/assets/menu/creme-brulee.jpg";
import crepes from "@/assets/menu/crepes-croustillante.jpg";
import cake from "@/assets/menu/cake.jpg";
import croissant from "@/assets/menu/croissant.jpg";
import chaussonPommes from "@/assets/menu/chausson-pommes.jpg";
import escargotSucre from "@/assets/menu/escargot-sucre.jpg";
import cafe from "@/assets/menu/cafe.jpg";
import lait from "@/assets/menu/lait.jpg";
import tisane from "@/assets/menu/tisane.jpg";
import jusNaturel from "@/assets/menu/jus-naturel.jpg";
import canette from "@/assets/menu/canette.jpg";
import boissonPm from "@/assets/menu/boisson-pm.jpg";
import boisson1l from "@/assets/menu/boisson-1l.jpg";
import eauPm from "@/assets/menu/eau-pm.jpg";
import eauGm from "@/assets/menu/eau-gm.jpg";

export type MenuVariant = { label: string; price: string };

export type MenuItem = {
  name: string;
  price?: string;
  desc?: string;
  img: string;
  alt: string;
  variants?: MenuVariant[];
};

export type MenuCategory = {
  id: string;
  name: string;
  tagline?: string;
  items: MenuItem[];
  notes?: MenuVariant[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "entrees",
    name: "Entrées",
    tagline: "Fraîches, légères & savoureuses",
    items: [
      { name: "Macédoine", price: "450 DA", desc: "Salade", img: macedoine, alt: "Salade macédoine" },
      { name: "Cesar", price: "550 DA", desc: "Salade", img: cesar, alt: "Salade Cesar" },
      { name: "Lentille Coraille", price: "300 DA", desc: "Soupe", img: soupeLentille, alt: "Soupe de lentilles corail" },
      { name: "Légumes et Poulet", price: "300 DA", desc: "Soupe", img: soupeLegumesPoulet, alt: "Soupe légumes et poulet" },
    ],
  },
  {
    id: "vol-au-vent",
    name: "Vol-au-vent",
    items: [
      { name: "Poulet", price: "450 DA", desc: "Escalope, champignons, olive, béchamel", img: volAuVentPoulet, alt: "Vol-au-vent poulet" },
      { name: "Viande", price: "500 DA", desc: "Viande haché, champignons, olive, béchamel", img: volAuVentViande, alt: "Vol-au-vent viande" },
    ],
  },
  {
    id: "pates",
    name: "Pâtes",
    items: [
      { name: "Lasagnes", price: "700 DA", img: lasagnes, alt: "Lasagnes" },
      { name: "Mac and Cheese", price: "300 DA", img: macAndCheese, alt: "Mac and cheese" },
    ],
  },
  {
    id: "bourak",
    name: "Bourak",
    tagline: "Croustillants, fondants & irrésistibles !",
    items: [
      { name: "Cigare Crevettes", price: "300 DA", desc: "Crevette, bisque de crevettes, fromage fondu", img: cigareCrevettes, alt: "Cigare aux crevettes" },
      { name: "Cigare Viande", price: "300 DA", desc: "Viande haché, fromage fondu", img: cigareViande, alt: "Cigare à la viande" },
      { name: "Cigare Escalope", price: "250 DA", desc: "Escalope, fromage fondu", img: cigareEscalope, alt: "Cigare escalope" },
    ],
  },
  {
    id: "classiques-crispy",
    name: "Les Classiques Crispy",
    tagline: "Généreux, fondant & savoureux !",
    items: [
      { name: "Galio FC", price: "550 DA", desc: "Tenders + frites", img: galioFc, alt: "Tenders de poulet avec frites" },
      { name: "Fish and Chips", price: "800 DA", desc: "Filet de sole panés, frites, salade, sauce tartare", img: fishAndChips, alt: "Fish and chips" },
    ],
  },
  {
    id: "sandwich",
    name: "Sandwich",
    tagline: "Généreux, fondant & savoureux !",
    items: [
      { name: "Escalope", price: "550 DA", desc: "Filet de poulet mariné, champignons à la crème, salade, gruyère + frite", img: sandwichEscalope, alt: "Sandwich escalope" },
      { name: "Viande", price: "600 DA", desc: "Steak haché, champignons à la crème, salade, gruyère + frite", img: sandwichViande, alt: "Sandwich viande" },
    ],
  },
  {
    id: "pizza",
    name: "Pizza",
    tagline: "Cuites à la perfection !",
    items: [
      { name: "Pizzarita", price: "400 DA", desc: "Sauce tomate, mozzarella", img: pizzaMargherita, alt: "Pizza sauce tomate et mozzarella" },
      { name: "Pizzaroni", price: "550 DA", desc: "Sauce tomate, mozzarella, péppéroni", img: pizzaPepperoni, alt: "Pizza pepperoni" },
      { name: "Pizzapignons", price: "550 DA", desc: "Sauce tomate, mozzarella, champignons", img: pizzaChampignons, alt: "Pizza aux champignons" },
      { name: "Pizztuna", price: "600 DA", desc: "Sauce tomate, mozzarella, thon", img: pizzaThon, alt: "Pizza au thon" },
      { name: "Pizzeto", price: "550 DA", desc: "Sauce pesto, mozzarella, noix", img: pizzaPesto, alt: "Pizza pesto et noix" },
      { name: "Pizzomage", price: "650 DA", desc: "Sauce fromagère, mozzarella, camembert, fromage fondu", img: pizzaFromage, alt: "Pizza aux fromages" },
      { name: "Pizziande", price: "600 DA", desc: "Sauce tomate, mozzarella, viande hachée", img: pizzaViande, alt: "Pizza à la viande hachée" },
      { name: "Pizzoulet", price: "550 DA", desc: "Sauce tomate, mozzarella, escalope de poulet", img: pizzaPoulet, alt: "Pizza au poulet" },
      { name: "Pizzvette", price: "750 DA", desc: "Bisque de crevettes, mozzarella, crevettes", img: pizzaCrevettes, alt: "Pizza aux crevettes" },
      { name: "Pizzétarien", price: "550 DA", desc: "Sauce tomate, mozzarella, légumes grillés", img: pizzaVegetarien, alt: "Pizza végétarienne" },
      { name: "Pizzaveg", price: "550 DA", desc: "Sauce tomate, légumes grillés, champignons", img: pizzaVeg, alt: "Pizza légumes et champignons" },
    ],
  },
  {
    id: "panini",
    name: "Panini",
    tagline: "Gratinés à la perfection !",
    items: [
      {
        name: "Fromage fondu",
        img: paniniFondu,
        alt: "Panini au fromage fondu",
        variants: [
          { label: "Escalope", price: "250 DA" },
          { label: "Abat", price: "300 DA" },
          { label: "Viande", price: "300 DA" },
        ],
      },
      {
        name: "Camembert",
        img: paniniCamembert,
        alt: "Panini au camembert",
        variants: [
          { label: "Escalope", price: "300 DA" },
          { label: "Abat", price: "300 DA" },
          { label: "Viande", price: "300 DA" },
        ],
      },
      {
        name: "Gruyère",
        img: paniniGruyere,
        alt: "Panini au gruyère",
        variants: [
          { label: "Escalope", price: "300 DA" },
          { label: "Abat", price: "300 DA" },
          { label: "Viande", price: "300 DA" },
        ],
      },
      {
        name: "3 Fromages",
        price: "300 DA",
        desc: "Fromage fondu + camembert + gruyère + frites",
        img: panini3Fromages,
        alt: "Panini 3 fromages",
      },
    ],
  },
  {
    id: "smash-burgers",
    name: "Smash Burgers",
    tagline: "Steak smashé caramélisé à la perfection !",
    items: [
      { name: "Double Smash", price: "600 DA", desc: "Double steak haché smashé, double gruyère, sauce fromagère", img: doubleSmash, alt: "Double smash burger" },
      { name: "Triple Smash", price: "850 DA", desc: "Triple steak haché smashé, triple gruyère, sauce fromagère", img: tripleSmash, alt: "Triple smash burger" },
      { name: "Quadrible Smash", price: "1100 DA", desc: "Quadrible steak haché smashé, quadrible gruyère, sauce fromagère", img: quadrupleSmash, alt: "Quadruple smash burger" },
      { name: "Fish Burger", price: "500 DA", desc: "Filet de sole pané, salade, sauce tartare, gouda", img: fishBurger, alt: "Fish burger" },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    tagline: "Des burgers gourmands, faits avec passion ! Pain artisanal",
    items: [
      { name: "Cosmic", price: "450 DA", desc: "Fromage fondu, steak haché, salade, oeuf", img: burgerCosmic, alt: "Burger Cosmic" },
      { name: "Dolores", price: "450 DA", desc: "Camembert, steak haché, salade, oeuf", img: burgerDolores, alt: "Burger Dolores" },
      { name: "Omega", price: "450 DA", desc: "Gruyère, steak haché, salade, oeuf", img: burgerOmega, alt: "Burger Omega" },
      { name: "Daenerys", price: "500 DA", desc: "Roquefort, steak haché, salade, oeuf", img: burgerDaenerys, alt: "Burger Daenerys" },
      { name: "Ivern", price: "500 DA", desc: "Champignon, fromage à l'ail et fines herbes, steak haché, salade, oeuf", img: burgerIvern, alt: "Burger Ivern" },
      { name: "Galio", price: "500 DA", desc: "Gruyère, chiken tenders", img: burgerGalio, alt: "Burger Galio" },
      { name: "Fromagio", price: "650 DA", desc: "Gruyère + camembert + fromage fondu, steak haché, oeuf", img: burgerFromagio, alt: "Burger Fromagio" },
      { name: "Gragas", price: "700 DA", desc: "2 fromages au choix, 2 steak haché, salade, oeuf", img: burgerGragas, alt: "Burger Gragas" },
    ],
  },
  {
    id: "tacos",
    name: "Tacos",
    tagline: "Généreux, fondants & savoureux !",
    items: [
      { name: "Escalope", price: "450 DA", img: tacosEscalope, alt: "Tacos escalope" },
      { name: "Viande", price: "500 DA", img: tacosViande, alt: "Tacos viande" },
      { name: "Abat", price: "500 DA", img: tacosAbat, alt: "Tacos abat" },
      { name: "Merguez", price: "500 DA", img: tacosMerguez, alt: "Tacos merguez" },
      { name: "Crispy", price: "500 DA", img: tacosCrispy, alt: "Tacos crispy" },
    ],
    notes: [
      { label: "Mixte (2 viandes)", price: "+ 100 DA" },
      { label: "Gratiné", price: "+ 150 DA" },
    ],
  },
  {
    id: "fake-poutine",
    name: "Fake Poutine",
    tagline: "Généreuse, fondante & savoureuse ! Deux tailles au choix.",
    items: [
      { name: "Escalope", price: "450 DA / 650 DA", img: poutineEscalope, alt: "Fake poutine escalope" },
      { name: "Abat", price: "500 DA / 700 DA", img: poutineAbat, alt: "Fake poutine abat" },
      { name: "Viande", price: "500 DA / 700 DA", img: poutineViande, alt: "Fake poutine viande" },
      { name: "Merguez", price: "500 DA / 700 DA", img: poutineMerguez, alt: "Fake poutine merguez" },
      { name: "Tenders", price: "550 DA / 750 DA", img: poutineTenders, alt: "Fake poutine tenders" },
      { name: "Crevette", price: "650 DA / 850 DA", img: poutineCrevette, alt: "Fake poutine crevette" },
    ],
  },
  {
    id: "bankai",
    name: "Bankai",
    tagline: "Généreux, fondant & irrésistible !",
    items: [
      { name: "Poulet", price: "700 DA", desc: "Escalope, gruyère, mozzarella, fromage fondu, sauce fromagère", img: bankaiPoulet, alt: "Bankai poulet" },
      { name: "Viande", price: "800 DA", desc: "Viande, gruyère, mozzarella, fromage fondu, sauce fromagère", img: bankaiViande, alt: "Bankai viande" },
      { name: "Abat", price: "800 DA", desc: "Abat, gruyère, mozzarella, fromage fondu, sauce fromagère", img: bankaiAbat, alt: "Bankai abat" },
    ],
  },
  {
    id: "sucre",
    name: "Sucré",
    items: [
      { name: "Riz au lait gastronomique", price: "500 DA", img: rizAuLait, alt: "Riz au lait gastronomique" },
      { name: "Pavlova", price: "300 DA", img: pavlova, alt: "Pavlova" },
      { name: "Cheese Cake", price: "400 DA", img: cheesecake, alt: "Cheese cake" },
      { name: "Tiramisu", price: "400 DA", img: tiramisu, alt: "Tiramisu" },
      { name: "Crème brûlée", price: "300 DA", img: cremeBrulee, alt: "Crème brûlée" },
      { name: "Crêpes croustillante", price: "300 DA", img: crepes, alt: "Crêpes croustillantes" },
      { name: "Cake", price: "300 DA - 600 DA", img: cake, alt: "Cake" },
    ],
  },
  {
    id: "viennoiserie",
    name: "Viennoiserie",
    items: [
      { name: "Croissant", price: "50 DA", img: croissant, alt: "Croissant" },
      { name: "Chausson aux pommes", price: "100 DA", img: chaussonPommes, alt: "Chausson aux pommes" },
      { name: "Escargots sucré", price: "80 DA", img: escargotSucre, alt: "Escargot sucré" },
    ],
  },
  {
    id: "boisson",
    name: "Boisson",
    items: [
      { name: "Café", price: "100 DA", img: cafe, alt: "Café" },
      { name: "Lait", price: "100 DA", img: lait, alt: "Lait" },
      { name: "Tisane et infusion", price: "100 DA", img: tisane, alt: "Tisane et infusion" },
      { name: "Jus naturel", price: "300 DA - 500 DA", img: jusNaturel, alt: "Jus naturel" },
      { name: "Canette", price: "100 DA", img: canette, alt: "Canette" },
      { name: "Boisson PM", price: "60 DA", img: boissonPm, alt: "Boisson petit modèle" },
      { name: "Boisson 1L", price: "150 DA", img: boisson1l, alt: "Boisson 1 litre" },
      { name: "Eau PM", price: "30 DA", img: eauPm, alt: "Eau petit modèle" },
      { name: "Eau GM", price: "50 DA", img: eauGm, alt: "Eau grand modèle" },
    ],
  },
];

export const supplements: { group: string; items: MenuVariant[] }[] = [
  {
    group: "Viandes",
    items: [
      { label: "Escalope", price: "150 DA" },
      { label: "Abat", price: "200 DA" },
      { label: "Steak haché", price: "250 DA" },
    ],
  },
  {
    group: "Fromages",
    items: [
      { label: "Fromage fondu", price: "100 DA" },
      { label: "Camembert", price: "100 DA" },
      { label: "Gruyére", price: "100 DA" },
      { label: "Mozzarella", price: "100 DA" },
    ],
  },
  {
    group: "Extras",
    items: [
      { label: "Oignon caramélise", price: "50 DA" },
      { label: "Oeuf", price: "50 DA" },
    ],
  },
  {
    group: "Frites",
    items: [
      { label: "Frites", price: "150 DA" },
      { label: "Frites + sauce fromagère", price: "250 DA" },
      { label: "Frites gratinées", price: "350 DA" },
    ],
  },
];
