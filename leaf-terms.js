// EliXiR Lab – Leaf description form: steps, options, drawings and Atlas links.
// This file is NOT touched by the content spreadsheet import. Edit it here.
//
// step   : {id, title, hint, a (Atlas term id), groups:[...]}
// group  : {id, label, kind:"chips"|"range"|"text", multi, join ("and"|"to"), cols, show(sel) , opts:[...]}
// group.def : default value(s) for a new description; option.na : "not assessed" (never written into the text)
// option : {id, l (label), t (word used in the description; default = label in lower case),
//           d (drawing key in DRAW), a (Atlas id, overrides the step's), c (colour swatch), h (sub-heading row)}
// DRAW   : key -> either a drawing spec for the built-in engine ("margin=serrate") or a full "<svg …>" string.
//          Replace any value with your own SVG to change a drawing.
(function(){
const S="#157a57",F="#e8f4ee",V="#8cc4ab";
const svg=(vb,b)=>`<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${b}</svg>`;
const DRAW={
 // leaf type
 t_simple:"type=simple",
 t_pinnatifid:"lobe=pin;d=.45", t_pinnatipartite:"lobe=pin;d=.75", t_pinnatisect:"lobe=pin;d=.96",
 t_palmatifid:"lobe=palm;d=.4", t_palmatipartite:"lobe=palm;d=.72", t_palmatisect:"lobe=palm;d=.95",
 t_pintri:"type=pintri", t_paripinnate:"type=paripinnate", t_imparipinnate:"type=imparipinnate", t_bipinnate:"type=bipinnate",
 t_paltri:"type=trifoliate", t_digitate:"type=palmate",
 // arrangement
 a_alternate:"arr=alternate", a_opposite:"arr=opposite", a_decussate:"arr=decussate", a_whorled:"arr=whorled",
 // shape
 s_linear:"shape=linear;base=cuneate", s_lanceolate:"shape=lanceolate", s_oblong:"shape=oblong", s_elliptic:"shape=elliptic",
 s_ovate:"shape=ovate", s_obovate:"shape=obovate;base=cuneate;apex=obtuse", s_orbicular:"shape=orbicular;apex=obtuse",
 s_cordate:"shape=ovate;base=cordate", s_spathulate:"shape=spathulate;apex=rounded",
 s_reniform:svg("-62 -96 124 116",`<path d="M0,-6 L0,16" stroke="${S}" stroke-width="1.8"/><path d="M0,-12 C-10,0 -56,-2 -58,-36 C-60,-70 -24,-84 0,-78 C24,-84 60,-70 58,-36 C56,-2 10,0 0,-12 Z" fill="${F}" stroke="${S}" stroke-width="1.6" stroke-linejoin="round"/><path d="M0,-12 L0,-76 M0,-12 L-40,-60 M0,-12 L40,-60 M0,-12 L-50,-28 M0,-12 L50,-28" stroke="${V}" stroke-width="1.1" fill="none"/>`),
 s_sagittate:svg("-62 -108 124 132",`<path d="M0,-6 L0,22" stroke="${S}" stroke-width="1.8"/><path d="M0,-100 C22,-72 30,-38 26,-12 L36,18 L12,-2 C8,-5 4,-7 0,-7 C-4,-7 -8,-5 -12,-2 L-36,18 L-26,-12 C-30,-38 -22,-72 0,-100 Z" fill="${F}" stroke="${S}" stroke-width="1.6" stroke-linejoin="round"/><path d="M0,-7 L0,-96 M0,-10 L26,12 M0,-10 L-26,12" stroke="${V}" stroke-width="1.1" fill="none"/>`),
 s_hastate:svg("-62 -108 124 132",`<path d="M0,-6 L0,22" stroke="${S}" stroke-width="1.8"/><path d="M0,-100 C18,-72 20,-42 17,-18 L48,-12 L44,-2 L10,-4 Q0,-7 -10,-4 L-44,-2 L-48,-12 L-17,-18 C-20,-42 -18,-72 0,-100 Z" fill="${F}" stroke="${S}" stroke-width="1.6" stroke-linejoin="round"/><path d="M0,-6 L0,-96 M0,-8 L42,-8 M0,-8 L-42,-8" stroke="${V}" stroke-width="1.1" fill="none"/>`),
 // apex
 ap_acute:"apex=acute;shape=elliptic", ap_acuminate:"apex=acuminate;shape=elliptic", ap_obtuse:"apex=obtuse;shape=elliptic",
 ap_rounded:"apex=rounded;shape=elliptic", ap_truncate:"apex=truncate;shape=elliptic", ap_emarginate:"apex=emarginate;shape=obovate",
 ap_mucronate:"apex=mucronate;shape=obovate", ap_cuspidate:"apex=cuspidate;shape=elliptic",
 // base
 b_cuneate:"base=cuneate;shape=obovate", b_acute:"base=acute;shape=elliptic", b_rounded:"base=rounded", b_truncate:"base=truncate",
 b_cordate:"base=cordate", b_oblique:"base=unequal;shape=elliptic", b_decurrent:"base=decurrent;shape=elliptic", b_auriculate:"base=auriculate;shape=lanceolate",
 // margin
 m_entire:"margin=entire", m_serrate:"margin=serrate", m_dentate:"margin=dentate", m_crenate:"margin=crenate",
 m_serrulate:"margin=serrulate", m_undulate:"margin=undulate", m_spiny:"margin=spiny;shape=elliptic", m_lobed:"margin=sinuate", m_revolute:"margin=revolute",
 // venation
 v_pinnate:"ven=pinnate;shape=elliptic", v_palmate:"ven=palmate", v_parallel:"ven=parallel;shape=linear", v_arcuate:"ven=arcuate;shape=elliptic",
 v_dichotomous:svg("-62 -112 124 134",`<path d="M0,0 L0,20" stroke="${S}" stroke-width="1.8"/><path d="M-3,-4 C-30,-30 -60,-70 -44,-98 Q0,-116 44,-98 C60,-70 30,-30 3,-4 Z" fill="${F}" stroke="${S}" stroke-width="1.6" stroke-linejoin="round"/><path d="M0,-4 L-12,-40 L-24,-72 M-12,-40 L-6,-80 M0,-4 L12,-40 L24,-72 M12,-40 L6,-80 M-24,-72 L-36,-96 M-24,-72 L-20,-100 M24,-72 L36,-96 M24,-72 L20,-100 M-6,-80 L-10,-104 M-6,-80 L-2,-106 M6,-80 L10,-104 M6,-80 L2,-106" stroke="${V}" stroke-width="1.1" fill="none"/>`),
 // surface
 h_glabrous:"surf=glabrous;shape=elliptic", h_pubescent:"surf=pubescent;shape=elliptic", h_tomentose:"surf=tomentose;shape=elliptic", h_scabrous:"surf=scabrous;shape=elliptic",
 g_glossy:"surf=glossy;shape=elliptic", g_dull:"surf=dull;shape=elliptic",
 x_coriaceous:"surf=coriaceous;shape=elliptic", x_membranous:"surf=membranous;shape=elliptic", x_succulent:"surf=succulent;shape=elliptic",
 // petiole, stipules, sheath
 p_petiolate:"pet=34", p_sessile:"pet=0", p_subsessile:"pet=7",
 st_present:"pet=26;stip=1", st_absent:"pet=26",
 sh_yes:"pet=0;sheath=1", sh_no:"pet=26"
};
const COL=[["green","Green","#3f8f3a"],["dark green","Dark green","#1f5a24"],["pale green","Pale green","#a8d59a"],["yellowish green","Yellow-green","#a9c23f"],["greyish green","Grey-green","#8fa58a"],["silvery","Silvery / white","#d9dedb"],["brown","Brown","#8a5a2b"],["reddish","Reddish","#a63a2e"]].map(([t,l,c])=>({id:t.replace(/ /g,"_"),l,t,c}));
const STEPS=[
 {id:"type",title:"Leaf type",hint:"Is the blade one piece, lobed, or divided into leaflets?",a:"mo_type",groups:[
  {id:"type",cols:3,opts:[
   {h:"Simple"},{id:"simple",l:"Simple",d:"t_simple",cat:"simple"},
   {h:"Lobed"},{id:"pinnatifid",l:"Pinnatifid",d:"t_pinnatifid",cat:"lobed"},{id:"pinnatipartite",l:"Pinnatipartite",d:"t_pinnatipartite",cat:"lobed"},{id:"pinnatisect",l:"Pinnatisect",d:"t_pinnatisect",cat:"lobed"},
   {id:"palmatifid",l:"Palmatifid",d:"t_palmatifid",cat:"lobed"},{id:"palmatipartite",l:"Palmatipartite",d:"t_palmatipartite",cat:"lobed"},{id:"palmatisect",l:"Palmatisect",d:"t_palmatisect",cat:"lobed"},
   {h:"Compound – pinnate"},{id:"pintri",l:"Trifoliate (pinnate)",t:"pinnately trifoliate",d:"t_pintri",cat:"compound"},{id:"paripinnate",l:"Paripinnate",d:"t_paripinnate",cat:"compound"},{id:"imparipinnate",l:"Imparipinnate",d:"t_imparipinnate",cat:"compound"},{id:"bipinnate",l:"Bipinnate",d:"t_bipinnate",cat:"compound"},
   {h:"Compound – palmate"},{id:"paltri",l:"Trifoliate (palmate)",t:"palmately trifoliate",d:"t_paltri",cat:"compound"},{id:"digitate",l:"Digitate",d:"t_digitate",cat:"compound"}]},
  {id:"leaflets",kind:"range",label:"Number of leaflets",unit:"",word:"leaflets",int:true,show:s=>{const o=LT.opt("type",s.type);return !!o&&o.cat==="compound"}}]},
 {id:"arr",title:"Arrangement on the stem",hint:"How leaves sit at each node (phyllotaxis).",a:"mo_arr",groups:[
  {id:"arr",cols:3,opts:[{id:"alternate",l:"Alternate",d:"a_alternate"},{id:"opposite",l:"Opposite",d:"a_opposite"},{id:"decussate",l:"Opposite decussate",t:"opposite decussate",d:"a_decussate"},{id:"whorled",l:"Whorled",d:"a_whorled"},{id:"na",l:"Not available",t:""}]}]},
 {id:"shape",title:"Shape",hint:"Outline of the lamina (or of a leaflet).",a:"mo_shape",groups:[
  {id:"shape",cols:3,opts:[{id:"linear",l:"Linear",d:"s_linear"},{id:"lanceolate",l:"Lanceolate",d:"s_lanceolate"},{id:"oblong",l:"Oblong",d:"s_oblong"},{id:"elliptical",l:"Elliptical",d:"s_elliptic"},{id:"ovate",l:"Ovate",d:"s_ovate"},{id:"obovate",l:"Obovate",d:"s_obovate"},
   {id:"orbicular",l:"Orbicular",d:"s_orbicular"},{id:"cordate",l:"Cordate",d:"s_cordate"},{id:"reniform",l:"Reniform",d:"s_reniform"},{id:"sagittate",l:"Sagittate",d:"s_sagittate"},{id:"hastate",l:"Hastate",d:"s_hastate"},{id:"spathulate",l:"Spathulate",d:"s_spathulate"},{id:"other",l:"Other (write in note)",t:""}]}]},
 {id:"apex",title:"Apex",hint:"The tip of the blade.",a:"mo_apex",groups:[
  {id:"apex",cols:3,opts:[{id:"acute",l:"Acute",d:"ap_acute"},{id:"acuminate",l:"Acuminate",d:"ap_acuminate"},{id:"obtuse",l:"Obtuse",d:"ap_obtuse"},{id:"rounded",l:"Rounded",d:"ap_rounded"},{id:"truncate",l:"Truncate",d:"ap_truncate"},{id:"emarginate",l:"Emarginate",d:"ap_emarginate"},{id:"mucronate",l:"Mucronate",d:"ap_mucronate"},{id:"cuspidate",l:"Cuspidate",d:"ap_cuspidate"}]}]},
 {id:"base",title:"Base",hint:"Where the blade joins the petiole.",a:"mo_base",groups:[
  {id:"base",cols:3,opts:[{id:"cuneate",l:"Cuneate",d:"b_cuneate"},{id:"acute",l:"Acute",d:"b_acute"},{id:"rounded",l:"Rounded",d:"b_rounded"},{id:"truncate",l:"Truncate",d:"b_truncate"},{id:"cordate",l:"Cordate",d:"b_cordate"},{id:"oblique",l:"Oblique (asymmetric)",t:"oblique (asymmetric)",d:"b_oblique"},{id:"decurrent",l:"Decurrent",d:"b_decurrent"},{id:"auriculate",l:"Auriculate",d:"b_auriculate"}]}]},
 {id:"margin",title:"Margin",hint:"The edge of the blade.",a:"mo_margin",groups:[
  {id:"margin",cols:3,opts:[{id:"entire",l:"Entire",d:"m_entire"},{id:"serrate",l:"Serrate",d:"m_serrate"},{id:"dentate",l:"Dentate",d:"m_dentate"},{id:"crenate",l:"Crenate",d:"m_crenate"},{id:"serrulate",l:"Serrulate",d:"m_serrulate"},{id:"undulate",l:"Undulate",d:"m_undulate"},{id:"spiny",l:"Spiny",d:"m_spiny"},{id:"lobed",l:"Lobed",d:"m_lobed"},{id:"revolute",l:"Revolute",d:"m_revolute"}]}]},
 {id:"ven",title:"Venation",hint:"Pattern of the veins.",a:"mo_ven",groups:[
  {id:"ven",cols:3,opts:[{id:"pinnate",l:"Pinnate reticulate",t:"pinnate reticulate",d:"v_pinnate"},{id:"palmate",l:"Palmate reticulate",t:"palmate reticulate",d:"v_palmate"},{id:"parallel",l:"Parallel",d:"v_parallel"},{id:"arcuate",l:"Arcuate",d:"v_arcuate"},{id:"dichotomous",l:"Dichotomous",d:"v_dichotomous"}]},
  {id:"prom",label:"Veins prominent on the lower surface?",cols:2,opts:[{id:"yes",l:"Yes",t:"prominent on the lower surface"},{id:"no",l:"No",t:"not prominent"}]}]},
 {id:"surf",title:"Surface & texture",hint:"Hairs, shine, texture and colour.",a:"mo_surf",groups:[
  {id:"hair",label:"Hairs",cols:3,opts:[{id:"glabrous",l:"Glabrous",d:"h_glabrous"},{id:"pubescent",l:"Pubescent",d:"h_pubescent"},{id:"tomentose",l:"Tomentose",d:"h_tomentose"},{id:"scabrous",l:"Scabrous",d:"h_scabrous"}]},
  {id:"gloss",label:"Shine",cols:3,opts:[{id:"glossy",l:"Glossy",d:"g_glossy"},{id:"dull",l:"Dull",d:"g_dull"}]},
  {id:"tex",label:"Texture",cols:3,opts:[{id:"coriaceous",l:"Coriaceous (leathery)",t:"coriaceous",d:"x_coriaceous"},{id:"membranous",l:"Membranous (thin)",t:"membranous",d:"x_membranous"},{id:"succulent",l:"Succulent (fleshy)",t:"succulent",d:"x_succulent"}]},
  {id:"cup",label:"Colour – upper surface",multi:true,join:"to",cols:2,text:"Other colour (optional)",opts:COL},
  {id:"clo",label:"Colour – lower surface",multi:true,join:"to",cols:2,text:"Other colour (optional)",opts:COL}]},
 {id:"size",title:"Size",hint:"Measure several leaves; enter a range (min – max). Leave max empty for a single value.",groups:[
  {id:"len",kind:"range",label:"Length",unit:"cm"},{id:"wid",kind:"range",label:"Width",unit:"cm"}]},
 {id:"pet",title:"Petiole & stipules",hint:"Leaf stalk, stipules and leaf base.",groups:[
  {id:"pet",label:"Petiole",cols:3,opts:[{id:"petiolate",l:"Petiolate",d:"p_petiolate"},{id:"sessile",l:"Sessile",d:"p_sessile"},{id:"subsessile",l:"Subsessile",d:"p_subsessile"}]},
  {id:"petlen",kind:"range",label:"Petiole length (optional)",unit:"cm",show:s=>s.pet==="petiolate"||s.pet==="subsessile"},
  {id:"stip",label:"Stipules",cols:2,opts:[{id:"present",l:"Present",t:"stipulate",d:"st_present"},{id:"absent",l:"Absent",t:"exstipulate",d:"st_absent"}]},
  {id:"sheath",label:"Leaf base sheathing",cols:2,opts:[{id:"yes",l:"Yes",t:"leaf base sheathing",d:"sh_yes"},{id:"no",l:"No",t:"",d:"sh_no"}]}]},
 {id:"org",title:"Odour & taste",hint:"Reference descriptors only.",warn:"Do not taste or directly smell specimens. Record odour/taste only from instructor-approved reference material.",groups:[
  {id:"odour",label:"Odour",cols:2,def:"notassessed",text:"Describe another odour (optional)",opts:[{id:"notassessed",l:"Not assessed",t:"",na:true},{id:"none",l:"None",full:"odourless"},{id:"aromatic",l:"Aromatic"},{id:"camphoraceous",l:"Camphoraceous"},{id:"pungent",l:"Pungent"},{id:"other",l:"Other (write in note)",t:""}]},
  {id:"taste",label:"Taste (choose one or more)",multi:true,cols:3,def:["notassessed"],text:"Describe another taste (optional)",opts:[{id:"notassessed",l:"Not assessed",t:"",na:true,solo:true},{id:"none",l:"None",full:"tasteless",solo:true},{id:"bitter",l:"Bitter"},{id:"sweet",l:"Sweet"},{id:"acrid",l:"Acrid"},{id:"astringent",l:"Astringent"},{id:"mucilaginous",l:"Mucilaginous"},{id:"other",l:"Other (write in note)",t:""}]}]}
];
const LT=self.LEAF_TERMS={version:1,DRAW,STEPS,
 group:id=>{for(const s of STEPS)for(const g of s.groups)if(g.id===id)return g},
 opt:(gid,oid)=>{if(oid==null)return;const g=LT.group(gid);return g&&g.opts&&g.opts.find(o=>o.id&&o.id===oid)}};
})();
