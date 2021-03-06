/*
▁▂▃▄▅▆▇██▇▆▅▄▃▂▁▁▂▃▄▅▆▇██▇▆▅▄▃▂▁▁▂▃▄▅▆▇██▇▆▅▄▃▂▁▁▂▃▄▅▆▇██▇▆▅▄▃▂▁▁▂▃▄▅▆▇██▇▆▅▄▃▂
                          _     _     _ _
                         | |   | |   (_) |
                _ __ __ _| |__ | |__  _| |_    ___  __ _ _ __
               | '__/ _` | '_ \| '_ \| | __|  / _ \/ _` | '__|
               | | | (_| | |_) | |_) | | |_  |  __/ (_| | |
               |_|  \__,_|_.__/|_.__/|_|\__|  \___|\__,_|_|

█▇▆▅▄▃▂▁▁▂▃▄▅▆▇██▇▆▅▄▃▂▁▁▂▃▄▅▆▇██▇▆▅▄▃▂▁▁▂▃▄▅▆▇██▇▆▅▄▃▂▁▁▂▃▄▅▆▇██▇▆▅▄▃▂▁▁▂▃▄▅▆▇
*/

import { isBrowser, isWebWorker, isNode } from "./environment/detect";

// top level
import origami from "./origami/index";
import math from "../include/math";
import graph from "./graph/index";
import svg from "../include/svg";
import fold from "./fold-through-all/index";
import convert from "./convert/convert";
import * as Axioms from "./axioms/index";

// to be included in the core
import apply_axiom from "./axioms/axiom_frame";
import * as affine from "./FOLD/affine";
import * as frames from "./FOLD/file_frames";
import * as object from "./FOLD/object";
import * as keys from "./FOLD/keys";
import * as collinear from "./FOLD/collinear";
import * as isolated from "./FOLD/isolated";
import * as validate from "./FOLD/validate";
import * as similar from "./FOLD/similar";
import fragment from "./FOLD/fragment";
import clean from "./FOLD/clean";
import join from "./FOLD/join";
import validateDefault from "./FOLD/validate";
import remove from "./FOLD/remove";
import rebuild from "./FOLD/rebuild";
import populate from "./FOLD/populate";
import * as make from "./FOLD/make";
import * as query from "./FOLD/query";
import * as marks from "./FOLD/marks";
import * as select from "./FOLD/select";
import * as kawasaki from "./kawasaki/index";
import build_diagram_frame from "./diagram/diagram_frame";
import add_edge from "./FOLD/add_edge";
import split_edge_run from "./FOLD/split_edge_run";
import { merge_run_diffs, apply_run_diff } from "./fold-through-all/run_frame";

// origami bases
import empty from "./bases/empty.fold";
import square from "./bases/square.fold";
import book from "./bases/book.fold";
import blintz from "./bases/blintz.fold";
import kite from "./bases/kite.fold";
import fish from "./bases/fish.fold";
import bird from "./bases/bird.fold";
import frog from "./bases/frog.fold";

import text_axioms from "./text/axioms.json";

// console.log(`RabbitEar v0.1.91 [ ${isBrowser ? "browser " : ""}${isWebWorker ? "webWorker " : ""}${isNode ? "node " : ""}]`);

const core = Object.create(null);
Object.assign(core,
  frames,
  object,
  collinear,
  isolated,
  keys,
  affine,
  validate,
  similar,
  make,
  marks,
  select,
  query,
  kawasaki,
  Axioms);

// these are defaults. they aren't objects like above.
// they need to be added this way.
core.build_diagram_frame = build_diagram_frame;
core.add_edge = add_edge;
core.split_edge_run = split_edge_run;
core.apply_run = apply_run_diff;
core.merge_run = merge_run_diffs;
core.apply_axiom = apply_axiom;
core.fragment = fragment;
core.clean = clean;
core.join = join;
core.remove = remove;
core.rebuild = rebuild;
core.populate = populate;
core.validate = validateDefault;

// load bases
const b = {
  empty: JSON.parse(empty),
  square: JSON.parse(square),
  book: JSON.parse(book),
  blintz: JSON.parse(blintz),
  kite: JSON.parse(kite),
  fish: JSON.parse(fish),
  bird: JSON.parse(bird),
  frog: JSON.parse(frog),
};

const bases = Object.create(null);
Object.defineProperty(bases, "empty", { get: () => core.clone(b.empty) });
Object.defineProperty(bases, "square", { get: () => core.clone(b.square) });
Object.defineProperty(bases, "book", { get: () => core.clone(b.book) });
Object.defineProperty(bases, "blintz", { get: () => core.clone(b.blintz) });
Object.defineProperty(bases, "kite", { get: () => core.clone(b.kite) });
Object.defineProperty(bases, "fish", { get: () => core.clone(b.fish) });
Object.defineProperty(bases, "bird", { get: () => core.clone(b.bird) });
Object.defineProperty(bases, "frog", { get: () => core.clone(b.frog) });

const rabbitEar = {
  origami,
  graph,
  svg,
  fold,
  convert,
  core,
  bases,
  text: {axioms: JSON.parse(text_axioms)},
  math: math.core,
  axiom: Axioms.axiom,
  equivalent: math.core.equivalent
};

Object.keys(math)
  .filter(key => key !== "core")
  .forEach((key) => { rabbitEar[key] = math[key]; });

export default rabbitEar;
