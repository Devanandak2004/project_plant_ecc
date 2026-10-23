/* ===== 1. DATA (edit here). Plan rects [x,y,w,h] are in drawing pixels, converted with `scale` (m/px = ESTIMATE).
   Machine/rack sizes are in metres and are ESTIMATES (not read from the drawing). ===== */
const plantData = {
  scale: 0.1, size: [1195, 675],
  catalog: { // [name, length, width, height, colour]
    smt: [['Loader',1.2,1,1.3,0x78909c],['Printer',1.6,1.4,1.5,0x1e88e5],['SPI',1,1.2,1.4,0x26a69a],['Mounter',2.4,1.8,1.5,0xfbc02d],['Mounter',2.4,1.8,1.5,0xfbc02d],['Mounter',2.4,1.8,1.5,0xfbc02d],['Reflow',6,1.6,1.4,0xe65100],['AOI',1.1,1.2,1.4,0x26a69a],['Unloader',1.2,1,1.3,0x78909c]],
    cc: [['Loader',1.2,.9,1,0x78909c],['Coater',2.5,1.4,1.5,0x8e24aa],['UV/Cure',4,1.2,1.3,0x5e35b1],['Inspect',1.5,1.1,1.4,0x26a69a],['Unloader',1.2,.9,1,0x78909c]]
  },
  areas: [
    {id:'smt',nav:'SMT',name:'SMT Area',rect:[25,100,285,470],color:0x4caf50,lines:{type:'smt',count:6,no:1,inset:[95,10]}},
    {id:'smtco',nav:'SMT Changeover',name:'SMT Changeover Area',rect:[30,105,145,38],color:0xe91e63,fill:[{fn:'workstation',n:3},{fn:'trolley',n:4}]},
    {id:'smtpdo',nav:'SMT PDO',name:'SMT PDO Area',rect:[25,585,205,85],color:0x8bc34a,fill:[{fn:'rack',n:8,rows:2,w:1.8,d:.8,h:2.2,levels:3},{fn:'trolley',n:4}]},
    {id:'laser',nav:'Laser Marking',name:'Laser Marking Area',rect:[235,585,70,85],color:0xff9800,fill:[{fn:'machine',n:2,w:1.6,d:1.2,h:1.5,color:0xb0bec5}]},
    {id:'hs',nav:'Heatsink Preparation',name:'Heatsink Preparation Area',rect:[328,105,337,85],color:0xffc107,fill:[{fn:'rack',n:10,rows:2,w:2,d:.8,h:2.2,levels:3},{fn:'workstation',n:6}]},
    {id:'mi1',nav:'MI 1–9',name:'MI Lines 1–9',rect:[328,195,337,375],color:0x29b6f6,lines:{type:'mi',count:9,no:1}},
    {id:'mi10',nav:'MI 10–17',name:'MI Lines 10–17',rect:[688,245,277,325],color:0x42a5f5,lines:{type:'mi',count:8,no:10}},
    {id:'mi18',nav:'MI 18–19',name:'MI Lines 18–19',rect:[688,105,277,65],color:0x5c6bc0,lines:{type:'mi',count:2,no:18}},
    {id:'hass',nav:'HASS',name:'HASS Test Area',rect:[688,175,277,35],color:0xef5350,fill:[{fn:'machine',n:10,w:1.8,d:1.4,h:2.1,color:0xcfd8dc}]},
    {id:'fut',nav:'Future Expansion',name:'Future Expansion Area',rect:[688,372,277,42],color:0xd500f9,fill:[]},
    {id:'cc',nav:'CC 1–14',name:'CC Lines 1–14',rect:[990,100,200,460],color:0x7e57c2,lines:{type:'cc',count:14,no:1}},
    {id:'tht',nav:'THT',name:'THT Area',rect:[360,585,210,85],color:0x1565c0,fill:[{fn:'workstation',n:8},{fn:'machine',n:2,w:2.5,d:1.4,h:1.5,color:0x1565c0}]},
    {id:'seat',nav:'Seating',name:'Seating Area',rect:[580,585,75,85],color:0x9e9e9e,fill:[{fn:'workstation',n:6}]},
    {id:'parts',nav:'Parts Preparation',name:'Parts Preparation Area',rect:[678,585,152,85],color:0xba68c8,fill:[{fn:'rack',n:12,rows:3,w:2.2,d:.7,h:2.2,levels:3}]},
    {id:'super',nav:'Supermarket',name:'Supermarket',rect:[840,585,120,85],color:0xff7043,fill:[{fn:'rack',n:12,rows:3,w:2.4,d:.8,h:2.4,levels:4}]},
    {id:'mipdo',nav:'MI PDO',name:'MI PDO Location',rect:[960,585,230,85],color:0xffa726,fill:[{fn:'rack',n:16,rows:4,w:2.4,d:.8,h:2.4,levels:3},{fn:'pallet',n:4}]},
    {id:'wh',nav:'Warehouse',name:'Warehouse (top gangway racks)',rect:[85,5,815,62],color:0x8d6e63,est:true,fill:[{fn:'rack',n:48,rows:2,w:2.4,d:1,h:3,levels:4},{fn:'pallet',n:10}]},
    {id:'qual',nav:'Quality',name:'Quality Area',rect:[2,5,80,80],color:0x26c6da,est:true,fill:[{fn:'workstation',n:4},{fn:'trolley',n:2}]},
    {id:'pack',nav:'Packing',name:'Packing Area',rect:[905,5,125,62],color:0xffee58,est:true,fill:[{fn:'workstation',n:6},{fn:'pallet',n:4}]},
    {id:'test',nav:'Testing',name:'Testing Area',rect:[1040,5,150,62],color:0xec407a,est:true,fill:[{fn:'machine',n:5,w:1.6,d:1.3,h:1.8,color:0xcfd8dc},{fn:'workstation',n:4}]}
  ],
  aisles: [[10,88,1175,12],[5,100,20,470],[310,100,18,470],[665,100,23,470],[965,100,25,470],[10,570,1180,15]],
  paths: [ // type ped|mat, w in metres
    {t:'mat',w:.7,pts:[[10,93],[1185,93]]},{t:'mat',w:.7,pts:[[316,100],[316,578]]},{t:'mat',w:.7,pts:[[675,100],[675,578]]},{t:'mat',w:.7,pts:[[976,100],[976,578]]},{t:'mat',w:.7,pts:[[10,577],[1185,577]]},
    {t:'ped',w:.5,pts:[[10,98],[1185,98]]},{t:'ped',w:.5,pts:[[322,100],[322,578]]},{t:'ped',w:.5,pts:[[683,100],[683,578]]},{t:'ped',w:.5,pts:[[984,100],[984,578]]},{t:'ped',w:.5,pts:[[10,582],[1185,582]]}
  ],
  amrs: [], // extra parked AMRs (the roaming AMR is configured in amrRoute)
  amrRoute: {pickup:[500,93], speed:4, wait:1.5, // pickup = warehouse dock (px on top material aisle); speed m/s; wait s
    lines:[{area:'mi1',aisleX:316},{area:'mi10',aisleX:675},{area:'mi18',aisleX:675}]}, // aisleX = px of the vertical material aisle used
  doors: [ // wall L/R: at = y px, wall T/B: at = x px; w = opening width (m)
    {wall:'L',at:93,w:4},{wall:'L',at:577,w:4},{wall:'R',at:93,w:4},{wall:'R',at:577,w:4},
    {wall:'T',at:316,w:4},{wall:'T',at:675,w:4},{wall:'T',at:976,w:4},{wall:'B',at:316,w:4},{wall:'B',at:675,w:4},{wall:'B',at:976,w:4}],
  flows: [ // editable: list of area ids; drawn as Manhattan polylines between area centres
    {name:'Main',color:0x00e676,ids:['wh','parts','super','mi1','test','hass','qual','pack']},
    {name:'SMT feed',color:0xffea00,ids:['wh','smtpdo','smt','mi1']},
    {name:'CC feed',color:0x40c4ff,ids:['super','mi10','cc','test']}
  ]
};

/* ===== 2. ENGINE ===== */
const D = plantData, S = D.scale, OX = D.size[0]*S/2, OZ = D.size[1]*S/2;
const wx = px => px*S - OX, wz = py => py*S - OZ;
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.shadowMap.enabled = true; renderer.setPixelRatio(Math.min(devicePixelRatio,2));
const scene = new THREE.Scene(); scene.background = new THREE.Color(0xcfd6dc); scene.fog = new THREE.Fog(0xcfd6dc,180,380);
const camera = new THREE.PerspectiveCamera(45,1,.5,800);
const controls = new THREE.OrbitControls(camera, canvas); controls.maxPolarAngle = Math.PI/2.02; controls.enableDamping = true;
scene.add(new THREE.HemisphereLight(0xffffff,0x778899,.8));
const sun = new THREE.DirectionalLight(0xffffff,.8); sun.position.set(-50,90,40); sun.castShadow = true;
Object.assign(sun.shadow.camera,{left:-80,right:80,top:50,bottom:-50,far:250}); sun.shadow.mapSize.set(2048,2048); scene.add(sun);

const LAYERS = ['areas','aisles','paths','machines','racks','labels','flow'];
const layerG = {}, stats = {}, areaMap = {}, pickables = [], flowers = [];
LAYERS.forEach(l => { layerG[l] = {}; const g = new THREE.Group(); g.name = l; scene.add(g); layerG[l]._root = g; });
let ctx = null, binList = [];
const BOX = new THREE.BoxGeometry(1,1,1), matCache = {};
const mat = c => matCache[c] || (matCache[c] = new THREE.MeshStandardMaterial({color:c,roughness:.7,metalness:.15}));
function add(layer, obj) { // put object in layer/area subgroup
  const g = layerG[layer][ctx.id] || (layerG[layer][ctx.id] = (() => { const s = new THREE.Group(); s.userData.area = ctx.id; layerG[layer]._root.add(s); return s; })());
  g.add(obj); return obj;
}
function box(p, w,h,d, color, x,y,z) { const m = new THREE.Mesh(BOX, mat(color)); m.scale.set(w,h,d); m.position.set(x,y+h/2,z); m.castShadow = m.receiveShadow = true; p.add(m); return m; }

/* ---- reusable components ---- */
function createLabel(text, x,y,z, size=6, layer='labels') {
  const c = document.createElement('canvas'); c.width = 512; c.height = 96; const g = c.getContext('2d');
  g.fillStyle = 'rgba(20,30,40,.78)'; g.fillRect(0,0,512,96); g.fillStyle = '#fff'; g.font = 'bold 44px Segoe UI,Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text,256,50,480);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));
  s.scale.set(size,size*96/512,1); s.position.set(x,y,z); s.renderOrder = 10; return add(layer, s);
}
function createMachine({name='Machine',w=1.5,d=1.2,h=1.4,color=0x90a4ae,x=0,z=0,rot=0}) {
  const g = new THREE.Group(); box(g,w,.15,d,0x37474f,0,0,0); box(g,w*.96,h-.15,d*.96,color,0,.15,0);
  box(g,w*.5,.05,d*.5,0x263238,0,h,0); box(g,.08,.35,.08,0x00e676,w*.4,h,0);
  g.position.set(x,0,z); g.rotation.y = rot; g.userData.name = name; stats[ctx.id].eq++; return add('machines', g);
}
function createConveyor(len, x,z, w=.5) { const g = new THREE.Group(); box(g,len,.1,w,0x455a64,0,.75,0); box(g,len,.04,w*.8,0x212121,0,.85,0); box(g,len,.75,.06,0x78909c,0,0,w/2-.03); box(g,len,.75,.06,0x78909c,0,0,-w/2+.03); g.position.set(x,0,z); return add('machines', g); }
function createBin(x,y,z,w,d,h) { binList.push([x,y,z,w,d,h]); }
function createRack({w=2,d=.8,h=2.2,levels=3,x=0,z=0,rot=0,fifo=false,name='Rack'}) {
  if (window.customRack) return window.customRack({w,d,h,levels,x,z,rot,ctx});   // <- plug your own bin/rack model here
  const g = new THREE.Group(), px = [-w/2+.04, w/2-.04], pz = [-d/2+.04, d/2-.04], col = fifo ? 0x2e7d32 : 0x1565c0;
  px.forEach(a => pz.forEach(b => box(g,.06,h,.06,col,a,0,b)));
  for (let l = 0; l < levels; l++) { const y = .2 + l*(h-.2)/levels; box(g,w,.04,d,0xff8f00,0,y,0);
    for (let k = 0; k < Math.max(2,Math.round(w/.55)); k++) { const bw = w/Math.max(2,Math.round(w/.55)) - .05; (g.userData.bins = g.userData.bins || []).push([-w/2+bw/2+.03+k*(bw+.05), y+.19, 0, bw, d*.8, .3]); } }
  g.position.set(x,0,z); g.rotation.y = rot; addBins(g);
  g.userData.name = name; stats[ctx.id].rack++; return add('racks', g);
}
const createFIFO = o => createRack({levels:3,h:1.6,fifo:true,name:'FIFO rack',...o});
function createTrolley(x,z,rot=0) { const g = new THREE.Group(); box(g,.9,.06,.6,0x9e9e9e,0,.15,0); box(g,.9,.04,.6,0x9e9e9e,0,.8,0); [[-.4,-.25],[.4,-.25],[-.4,.25],[.4,.25]].forEach(p => box(g,.04,.65,.04,0x616161,p[0],.15,p[1])); g.position.set(x,0,z); g.rotation.y = rot; g.userData.name = 'Trolley'; stats[ctx.id].rack++; return add('racks', g); }
function createPallet(x,z) { const g = new THREE.Group(); box(g,1.2,.14,1,0xa1887f,0,0,0); box(g,1.1,.7,.9,0xd7ccc8,0,.14,0); g.position.set(x,0,z); g.userData.name = 'Pallet'; stats[ctx.id].rack++; return add('racks', g); }
function createWorkstation(x,z,rot=0) { const g = new THREE.Group(); box(g,1.4,.05,.7,0xeceff1,0,.75,0); [[-.65,-.3],[.65,-.3],[-.65,.3],[.65,.3]].forEach(p => box(g,.05,.75,.05,0x607d8b,p[0],0,p[1]));
  box(g,.4,.3,.04,0x212121,0,.8,-.2); box(g,.4,.05,.4,0x37474f,0,.45,.7); box(g,.4,.45,.05,0x37474f,0,.5,.9); g.position.set(x,0,z); g.rotation.y = rot; g.userData.name = 'Workstation'; stats[ctx.id].eq++; return add('machines', g); }
function createSMTLine(x,z,no) { return createCatalogLine('smt',x,z,'SMT Line '+no); }
function createCCLine(x,z,no) { return createCatalogLine('cc',x,z,'CC Line '+no); }
function createCatalogLine(type,x,z,label) { let cx = x; const total = D.catalog[type].reduce((s,m) => s+m[1]+.15,0); 
  createConveyor(total,x+total/2,z,.5);
  D.catalog[type].forEach(m => { createMachine({name:m[0],w:m[1],d:m[2],h:m[3],color:m[4],x:cx+m[1]/2,z}); cx += m[1]+.15; });
  createLabel(label,x+1.5,2.4,z,3.2); return total; }
function createMILine(x,z,no,len) { createConveyor(len,x+len/2,z,.6); const n = Math.floor((len-6)/2.2);
  for (let i = 0; i < n; i++) { createWorkstation(x+4+i*2.2,z-1.1,0); createWorkstation(x+4+i*2.2,z+1.1,Math.PI); }
  createMachine({name:'Wave/Selective',w:3,d:1.6,h:1.5,color:0xef6c00,x:x+len-6,z}); createMachine({name:'Test',w:1.4,d:1.2,h:1.4,color:0x26a69a,x:x+len-3,z}); createMachine({name:'Pack-out',w:1.2,d:1,h:1,color:0x78909c,x:x+len-1,z});
  createFIFO({w:1.8,d:.7,x:x+1.2,z:z+1.4,name:'FIFO'}); createFIFO({w:1.8,d:.7,x:x+3.2,z:z-1.4,name:'FIFO'}); createLabel('MI Line '+no,x+2,2.4,z,3.2); }
function createAisle([x,y,w,h]) { const m = new THREE.Mesh(new THREE.PlaneGeometry(w*S,h*S),new THREE.MeshBasicMaterial({color:0x7be07b})); m.rotation.x = -Math.PI/2; m.position.set(wx(x+w/2),.03,wz(y+h/2)); ctx = {id:'_aisle'}; return add('aisles',m); }
function createPathway({t,w,pts}) { const c = t === 'mat' ? 0xffd600 : 0x2979ff;
  for (let i = 0; i < pts.length-1; i++) { const a = pts[i], b = pts[i+1], l = Math.hypot(b[0]-a[0],b[1]-a[1])*S;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(l,w),new THREE.MeshBasicMaterial({color:c})); m.rotation.x = -Math.PI/2; m.rotation.z = -Math.atan2(b[1]-a[1],b[0]-a[0]);
    m.position.set(wx((a[0]+b[0])/2),.05,wz((a[1]+b[1])/2)); ctx = {id:'_path'}; add('paths',m); } }
function createArea(a) { const [x,y,w,h] = a.rect; ctx = a; stats[a.id] = {eq:0,rack:0}; areaMap[a.id] = a;
  a.c = {x:wx(x+w/2), z:wz(y+h/2), w:w*S, d:h*S};
  const f = new THREE.Mesh(new THREE.PlaneGeometry(a.c.w,a.c.d),new THREE.MeshBasicMaterial({color:a.color,transparent:true,opacity:.28,depthWrite:false})); f.rotation.x = -Math.PI/2; f.position.set(a.c.x,.06,a.c.z); a.floor = f; add('areas',f);
  const e = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(a.c.w,.01,a.c.d)),new THREE.LineBasicMaterial({color:a.color})); e.position.set(a.c.x,.08,a.c.z); add('areas',e);
  createLabel(a.name+(a.est?' (est.)':''),a.c.x,5.5,a.c.z - a.c.d/2 + 1,Math.min(9,Math.max(4.5,a.c.w*.3)));
  if (a.lines) { const L = a.lines, top = a.c.z - a.c.d/2 + L.inset?.[0]*S || 0, usable = a.c.d - ((L.inset?.[0]||0)+(L.inset?.[1]||0))*S, pitch = usable/L.count, x0 = a.c.x - a.c.w/2 + 1.5;
    for (let i = 0; i < L.count; i++) { const z = a.c.z - a.c.d/2 + (L.inset?.[0]||0)*S + pitch*(i+.5), no = L.no+i;
      if (L.type === 'smt') createSMTLine(x0,z,no); else if (L.type === 'cc') createCCLine(x0,z,no); else createMILine(x0,z,no,a.c.w-3); } }
  (a.fill||[]).forEach(s => fillGrid(a,s)); flushBins(); }
function fillGrid(a,s) { const rows = s.rows||(s.fn==='rack'?2:1), cols = Math.ceil(s.n/rows), cw = a.c.w/cols, cd = a.c.d/rows;
  for (let i = 0; i < s.n; i++) { const x = a.c.x - a.c.w/2 + cw*((i%cols)+.5), z = a.c.z - a.c.d/2 + cd*(Math.floor(i/cols)+.5);
    ({machine:() => createMachine({name:'Machine',w:s.w,d:s.d,h:s.h,color:s.color,x,z}), rack:() => createRack({w:s.w,d:s.d,h:s.h,levels:s.levels,x,z}), workstation:() => createWorkstation(x,z), trolley:() => createTrolley(x,z), pallet:() => createPallet(x,z)})[s.fn](); } }
function flushBins() { if (!binList.length) return; const im = new THREE.InstancedMesh(BOX,mat(0x42a5f5),binList.length), m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  binList.forEach((b,i) => { e.set(0,b[6]||0,0); q.setFromEuler(e); m.compose(new THREE.Vector3(b[0],b[1]+b[5]/2,b[2]),q,new THREE.Vector3(b[3],b[5],b[4])); im.setMatrixAt(i,m); }); im.castShadow = true; add('racks',im); binList = []; }
function createMaterialFlow(f) { ctx = {id:'_flow'}; const pts = []; f.ids.forEach((id,i) => { const c = areaMap[id].c, p = new THREE.Vector3(c.x,1.6,c.z);
    if (i) { const q = pts[pts.length-1]; pts.push(new THREE.Vector3(p.x,1.6,q.z)); } pts.push(p); });
  const g = new THREE.Group(); g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:f.color})));
  const path = new THREE.CurvePath(); for (let i = 0; i < pts.length-1; i++) if (pts[i].distanceTo(pts[i+1]) > .01) path.add(new THREE.LineCurve3(pts[i],pts[i+1]));
  for (let i = 0; i < 14; i++) { const s = new THREE.Mesh(new THREE.ConeGeometry(.6,1.4,8),new THREE.MeshBasicMaterial({color:f.color})); g.add(s); flowers.push({s,path,o:i/14}); }
  add('flow',g); }

/* ---- AMR (Sherpa-Tug style) + spec recording so every object can be saved/restored ---- */
function createAMR({x=0,z=0,rot=0,name='AMR Tug'}) { const g = new THREE.Group(), Y = 0xffc400;
  [[-.45,-.42],[-.45,.42],[.45,-.42],[.45,.42]].forEach(p => { const w = new THREE.Mesh(new THREE.CylinderGeometry(.17,.17,.12,14),mat(0x212121)); w.rotation.x = Math.PI/2; w.position.set(p[0],.17,p[1]); g.add(w); });
  box(g,1.3,.1,.8,0x263238,0,.1,0); box(g,1.2,.75,.8,Y,0,.2,0); box(g,.85,.4,.66,Y,-.08,.95,0); box(g,.06,.45,.5,0x263238,.6,.35,0);
  box(g,.04,.1,.12,0x2979ff,.63,.5,.15); box(g,.04,.1,.12,0x2979ff,.63,.5,-.15); box(g,.5,.04,.82,0xff1744,-.1,.6,0);
  box(g,.05,.3,.05,0x37474f,0,1.35,0); const b = new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.16,10),new THREE.MeshBasicMaterial({color:0xff9100})); b.position.y = 1.72; g.add(b);
  g.position.set(x,0,z); g.rotation.y = rot; g.userData.name = name; stats[ctx.id].eq++; return add('machines',g); }
const NM = {createConveyor:'Conveyor',createPallet:'Pallet',createAMR:'AMR Tug'};
function rec(n) { const f = window[n]; window[n] = function() { const o = f.apply(this,arguments); if (o && o.userData) { o.userData.spec = {fn:n,args:JSON.parse(JSON.stringify([...arguments]))}; if (!o.userData.name) o.userData.name = n === 'createLabel' ? 'Label: '+arguments[0] : (NM[n] || n.slice(6)); } return o; }; }
['createMachine','createConveyor','createRack','createTrolley','createPallet','createWorkstation','createLabel','createAMR'].forEach(rec);

/* ---- walls with door openings where pathways meet the border ---- */
function buildWalls() { const W = D.size[0]*S, H = D.size[1]*S, wm = 0x8a949c, Y = 0xffd600, walls = {L:{len:H,ax:'z',fix:-W/2},R:{len:H,ax:'z',fix:W/2},T:{len:W,ax:'x',fix:-H/2},B:{len:W,ax:'x',fix:H/2}};
  Object.entries(walls).forEach(([k,w]) => { const half = w.len/2, side = k === 'L' || k === 'R';
    const gs = D.doors.filter(d => d.wall === k).map(d => { const c = side ? wz(d.at) : wx(d.at); return [c-d.w/2,c+d.w/2,c,d.w]; }).sort((a,b) => a[0]-b[0]), seg = (a,b) => { if (b-a < .05) return; const m = (a+b)/2, l = b-a; if (side) box(scene,.4,3,l,wm,w.fix,0,m); else box(scene,l,3,.4,wm,m,0,w.fix); };
    let p = -half; gs.forEach(g => { seg(p,g[0]); p = g[1]; const c = g[2], l = g[3];
      if (side) { box(scene,.5,.5,l,Y,w.fix,2.5,c); box(scene,.5,2.5,.3,Y,w.fix,0,c-l/2); box(scene,.5,2.5,.3,Y,w.fix,0,c+l/2); }
      else { box(scene,l,.5,.5,Y,c,2.5,w.fix); box(scene,.3,2.5,.5,Y,c-l/2,0,w.fix); box(scene,.3,2.5,.5,Y,c+l/2,0,w.fix); } });
    seg(p,half); }); }
/* ===== 3. BUILD ===== */
(function build() {
  const [W,H] = D.size, fl = new THREE.Mesh(new THREE.PlaneGeometry(W*S+20,H*S+20),new THREE.MeshStandardMaterial({color:0x9aa3aa,roughness:.9})); fl.rotation.x = -Math.PI/2; fl.receiveShadow = true; scene.add(fl);
  buildWalls();
  D.aisles.forEach(createAisle); D.paths.forEach(createPathway); D.areas.forEach(createArea); D.amrs.forEach(m => { ctx = {id:m.area}; createAMR({x:wx(m.px),z:wz(m.py),rot:m.rot}); }); D.flows.forEach(createMaterialFlow);
  scene.traverse(o => { if (o.isMesh || o.isInstancedMesh) pickables.push(o); });
})();

/* ===== 4. UI ===== */
const info = document.getElementById('info'), nav = document.getElementById('nav'), cc = {x:0,z:0}; let selected = null, measuring = false, mpts = [];
function setView(dir,dist,tx=0,tz=0) { controls.target.set(tx,0,tz); camera.position.set(tx+dir[0]*dist,dir[1]*dist,tz+dir[2]*dist); }
const VIEWS = {iso:[.55,.7,.75], top:[0,1,.001], front:[0,.25,1]};
let curView = 'iso'; const resetView = () => setView(VIEWS[curView],110);
function focusArea(id) { const a = areaMap[id], d = Math.max(a.c.w,a.c.d)*1.1+14; setView(VIEWS.iso,d,a.c.x,a.c.z); select(id); }
function select(id) { if (selected) areaMap[selected].floor.material.opacity = .28; selected = id; if (!id) return; const a = areaMap[id]; a.floor.material.opacity = .6;
  const L = a.lines ? `${a.nav} (lines ${a.lines.no}–${a.lines.no+a.lines.count-1})` : '—';
  info.innerHTML = `<b>${a.name}</b>${a.est?' <i>(position estimated)</i>':''}<br>Line numbers: ${a.lines?`${a.lines.no}–${a.lines.no+a.lines.count-1} (${a.lines.count} lines)`:'—'}<br>Equipment: ${stats[id].eq} · Racks/trolleys/pallets: ${stats[id].rack}<br>Size: ~${a.c.w.toFixed(0)} × ${a.c.d.toFixed(0)} m <i>(estimate, scale ${S} m/px)</i>`; document.querySelectorAll('.row button.nm').forEach(b => b.classList.toggle('on',b.dataset.id === id)); }
D.areas.forEach(a => { const r = document.createElement('div'); r.className = 'row'; r.innerHTML = `<button class="nm" data-id="${a.id}">${a.nav}</button><button class="eye" data-eye="${a.id}">👁</button>`; nav.appendChild(r); });
nav.onclick = e => { const t = e.target; if (t.dataset.id) focusArea(t.dataset.id); if (t.dataset.eye) setAreaVis(t.dataset.eye, t.dataset.off === '1'); };
document.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { curView = b.dataset.v; resetView(); });
document.querySelectorAll('[data-l]').forEach(c => c.onchange = () => layerG[c.dataset.l]._root.visible = c.checked);
document.getElementById('reset').onclick = () => { curView = 'iso'; resetView(); };
document.getElementById('full').onclick = () => document.fullscreenElement ? document.exitFullscreen() : document.getElementById('stage').requestFullscreen();
document.getElementById('meas').onclick = e => { measuring = !measuring; e.target.classList.toggle('on',measuring); mpts = []; if (measuring) info.innerHTML = 'Measure: click two floor points'; };
const ray = new THREE.Raycaster(), mouse = new THREE.Vector2(); let down = null;
canvas.onpointerdown = e => down = [e.clientX,e.clientY];
canvas.onpointerup = e => { if (editMode || !down || Math.hypot(e.clientX-down[0],e.clientY-down[1]) > 4) return; const r = canvas.getBoundingClientRect();
  mouse.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1); ray.setFromCamera(mouse,camera);
  if (measuring) { const p = new THREE.Vector3(); if (!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),p)) return; mpts.push(p);
    if (mpts.length === 2) { info.innerHTML = `<b>Distance:</b> ${mpts[0].distanceTo(mpts[1]).toFixed(2)} m <i>(scale is an estimate)</i>`; const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(mpts.map(v => v.clone().setY(.3))),new THREE.LineBasicMaterial({color:0xff1744})); scene.add(l); setTimeout(() => scene.remove(l),8000); mpts = []; } return; }
  const hit = ray.intersectObjects(pickables.filter(o => { let p = o; while (p) { if (!p.visible) return false; p = p.parent; } return true; }))[0];
  if (hit) { let o = hit.object, nm = null; while (o) { if (o.userData.name && !nm) nm = o.userData.name; if (o.userData.area) { select(o.userData.area); if (nm) info.innerHTML += `<br>Object: <b>${nm}</b>`; return; } o = o.parent; }
    let best = null; D.areas.forEach(a => { if (Math.abs(hit.point.x-a.c.x) < a.c.w/2 && Math.abs(hit.point.z-a.c.z) < a.c.d/2 && (!best || a.c.w*a.c.d < best.c.w*best.c.d)) best = a; }); if (best) select(best.id); } };
function resize() { const p = canvas.parentElement; renderer.setSize(p.clientWidth,p.clientHeight,false); camera.aspect = p.clientWidth/p.clientHeight; camera.updateProjectionMatrix(); }
addEventListener('resize',resize); resize(); resetView();
(function loop(t) { requestAnimationFrame(loop); flowers.forEach(f => { const u = (t/12000 + f.o) % 1, p = f.path.getPointAt(u), q = f.path.getPointAt(Math.min(.999,u+.002)); f.s.position.copy(p); f.s.lookAt(q); f.s.rotateX(Math.PI/2); }); if (goal) { controls.target.lerp(goal.t,.06); camera.position.lerp(goal.p,.06); if (camera.position.distanceTo(goal.p) < .3) goal = null; } controls.update(); renderer.render(scene,camera); })(0);

/* ===== 5. LAYOUT EDITOR (Edit layout button) ===== */
function addBins(g) { const b = g.userData.bins || []; if (!b.length) return; const im = new THREE.InstancedMesh(BOX,mat(0x42a5f5),b.length), m = new THREE.Matrix4();
  b.forEach((v,i) => { m.compose(new THREE.Vector3(v[0],v[1],v[2]),new THREE.Quaternion(),new THREE.Vector3(v[3],v[5],v[4])); im.setMatrixAt(i,m); }); im.castShadow = true; g.add(im); delete g.userData.bins; }
function createSign({text='AREA',color='#1565c0',shape='board',w=8,x=0,z=0,rot=0}) {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 256; const g = c.getContext('2d');
  g.fillStyle = color; g.fillRect(0,0,1024,256); g.strokeStyle = '#fff'; g.lineWidth = 10; g.strokeRect(8,8,1008,240);
  g.fillStyle = '#fff'; g.font = 'bold 110px Segoe UI,Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text,512,134,950);
  const face = new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)}), h = w/4, grp = new THREE.Group();
  if (shape === 'floor') { const m = new THREE.Mesh(new THREE.PlaneGeometry(w,h),face); m.rotation.x = -Math.PI/2; m.position.y = .1; grp.add(m); }
  else { const dk = mat(0x37474f); box(grp,.1,3,.1,0x37474f,-w*.4,0,0); box(grp,.1,3,.1,0x37474f,w*.4,0,0);
    const b = new THREE.Mesh(BOX,[dk,dk,dk,dk,face,face]); b.scale.set(w,h,.12); b.position.y = 3+h/2; b.castShadow = true; grp.add(b); }
  grp.position.set(x,0,z); grp.rotation.y = rot; grp.userData = {name:'Sign: '+text, sign:{text,color,shape,w}}; return add('labels',grp); }

let editMode = false, item = null, drag = null, hl = null, axes = null, SN = .5, dirtyF = false;
var goal = null; const undoS = [];
const $ = id => document.getElementById(id), ground = new THREE.Plane(new THREE.Vector3(0,1,0),0), gp = new THREE.Vector3(), KEY = 'eccPlantLayout_v1', U = {mm:1000,in:39.3701,m:1};
rec('createSign');
const ADD = {'Generic machine':{k:'m',w:1.5,d:1.2,h:1.4,c:0x90a4ae},'AMR (Sherpa Tug)':{k:'a'},'Rack':{k:'r',w:2,d:.8,h:2.2},'FIFO rack':{k:'f',w:1.8,d:.7,h:1.6},'Workstation':{k:'w'},'Trolley':{k:'t'},'Pallet':{k:'p'}};
[...D.catalog.smt,...D.catalog.cc].forEach(m => ADD[m[0]] = ADD[m[0]] || {k:'m',w:m[1],d:m[2],h:m[3],c:m[4]});
Object.keys(ADD).forEach(n => $('eType').add(new Option(n)));
const fillDims = () => { const t = ADD[$('eType').value]; ['W','D','H'].forEach((a,i) => { const el = $('e'+a); el.value = t['wdh'[i]] || ''; el.disabled = !t.w; }); };
$('eType').onchange = fillDims; fillDims();
const snap = v => SN ? Math.round(v/SN)*SN : v, vis = o => { while (o) { if (!o.visible) return false; o = o.parent; } return true; };
const areaAt = (x,z) => { let b = null; D.areas.forEach(a => { if (Math.abs(x-a.c.x) < a.c.w/2 && Math.abs(z-a.c.z) < a.c.d/2 && (!b || a.c.w*a.c.d < b.c.w*b.c.d)) b = a; }); return b; };
const topItem = o => { while (o && !(o.parent && o.parent.userData.area)) o = o.parent; return o && o.userData.name ? o : null; };
const dirty = () => { dirtyF = true; $('eStat').textContent = 'Unsaved changes'; };
/* --- snapshot / restore / undo / save --- */
const ITEM_LAYERS = ['machines','racks','labels'];
function snapshot() { const out = []; ITEM_LAYERS.forEach(l => Object.values(layerG[l]).forEach(g => { if (g.userData.area !== undefined) g.children.forEach(o => { if (o.userData.spec) out.push({a:g.userData.area,s:o.userData.spec,p:o.position.toArray(),r:o.rotation.y}); }); })); return out; }
function restore(arr) { ITEM_LAYERS.forEach(l => Object.keys(layerG[l]).forEach(k => k !== '_root' && layerG[l][k].clear()));
  arr.forEach(e => { ctx = {id:e.a}; const o = window[e.s.fn](...e.s.args); o.position.fromArray(e.p); o.rotation.y = e.r; }); recount(); }
const undoPush = (str) => { undoS.push(str || JSON.stringify(snapshot())); if (undoS.length > 40) undoS.shift(); dirty(); };
function undo() { if (!undoS.length) return; pick(null); restore(JSON.parse(undoS.pop())); dirty(); }
$('eUndo').onclick = undo;
$('eSave').onclick = () => { try { localStorage.setItem(KEY,JSON.stringify(snapshot())); dirtyF = false; $('eStat').textContent = 'Saved ✓ – will reload after refresh'; } catch (e) { $('eStat').textContent = 'Save failed: '+e.message; } };
$('eReset').onclick = () => { if (confirm('Discard the saved layout and restore the default?')) { localStorage.removeItem(KEY); dirtyF = false; location.reload(); } };
addEventListener('beforeunload', e => { if (dirtyF) { e.preventDefault(); e.returnValue = ''; } });
function recount() { D.areas.forEach(a => { const n = l => layerG[l][a.id] ? layerG[l][a.id].children.filter(c => c.userData.name && c.userData.name !== 'Conveyor').length : 0; stats[a.id].eq = n('machines'); stats[a.id].rack = n('racks'); }); if (selected) select(selected); }
function setAreaVis(id,v) { const b = document.querySelector(`[data-eye="${id}"]`); b.dataset.off = v ? '0' : '1'; b.style.opacity = v ? 1 : .35; LAYERS.forEach(l => { if (layerG[l][id]) layerG[l][id].visible = v; }); }
/* --- selection & transform fields --- */
function sync() { const f = U[$('unit').value], dp = f > 100 ? 0 : f > 1 ? 2 : 3; ['tX','tY','tZ','tR'].forEach(i => $(i).disabled = !item); if (!item) return;
  const p = item.position; $('tX').value = ((p.x+OX)*f).toFixed(dp); $('tY').value = (p.y*f).toFixed(dp); $('tZ').value = ((p.z+OZ)*f).toFixed(dp); $('tR').value = Math.round(item.rotation.y*180/Math.PI) % 360; if (axes) axes.position.copy(p); if (hl) hl.update(); }
function pick(o) { item = o; if (hl) scene.remove(hl); if (axes) scene.remove(axes); hl = axes = null;
  if (o) { hl = new THREE.BoxHelper(o,0xffeb3b); axes = new THREE.AxesHelper(2.5); axes.material.depthTest = false; axes.renderOrder = 9; scene.add(hl,axes);
    const s = o.userData.spec, a = o.userData.sign; if (s && s.fn === 'createSign') { $('sText').value = a.text; $('sColor').value = a.color; $('sShape').value = a.shape; $('sW').value = a.w; } else if (s && s.fn === 'createLabel') { $('sText').value = s.args[0]; $('sW').value = s.args[4] || 6; } }
  $('eSel').innerHTML = o ? `Selected: <b>${o.userData.name}</b> (${areaMap[o.parent.userData.area]?.nav})` : 'Nothing selected'; sync(); }
$('unit').onchange = () => { const st = {mm:50,in:2,m:.05}[$('unit').value]; ['tX','tY','tZ'].forEach(i => $(i).step = st); sync(); };
$('snap').onchange = () => SN = +$('snap').value;
function settle() { const a = areaAt(item.position.x,item.position.z); if (a && a.id !== item.parent.userData.area) { const layer = item.parent.parent.name; ctx = {id:a.id}; add(layer,item); } recount(); pick(item); }
['tX','tY','tZ','tR'].forEach(i => $(i).onchange = () => { if (!item) return; undoPush(); const f = U[$('unit').value]; item.position.set(+$('tX').value/f-OX,+$('tY').value/f,+$('tZ').value/f-OZ); item.rotation.y = +$('tR').value*Math.PI/180; settle(); });
function ndc(e) { const r = canvas.getBoundingClientRect(); mouse.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1); ray.setFromCamera(mouse,camera); }
canvas.addEventListener('pointerdown', e => { goal = null; if (!editMode) return; ndc(e);
  const hs = ray.intersectObjects(scene.children,true).filter(h => vis(h.object)).map(h => topItem(h.object)).filter(Boolean), hit = e.shiftKey ? hs.find(o => o.isSprite) || hs[0] : hs.find(o => !o.isSprite) || hs[0];
  if (hit) { pick(hit); ray.ray.intersectPlane(ground,gp); drag = {dx:hit.position.x-gp.x, dz:hit.position.z-gp.z, pre:JSON.stringify(snapshot()), moved:false}; controls.enabled = false; } else pick(null); }, true);
canvas.addEventListener('pointermove', e => { if (!drag || !item) return; ndc(e); if (ray.ray.intersectPlane(ground,gp)) { drag.moved = true; item.position.x = snap(gp.x+drag.dx); item.position.z = snap(gp.z+drag.dz); sync(); } });
addEventListener('pointerup', () => { if (!drag) return; const d = drag; drag = null; controls.enabled = true; if (d.moved) { undoPush(d.pre); settle(); } });
const rot = () => { if (item) { undoPush(); item.rotation.y += Math.PI/2; sync(); } };
const del = () => { if (item) { undoPush(); item.parent.remove(item); pick(null); recount(); } };
$('eRot').onclick = rot; $('eDel').onclick = del;
$('eDup').onclick = () => { if (!item) return; undoPush(); const c = item.clone(true); c.position.x += 1; c.position.z += 1; item.parent.add(c); pick(c); recount(); };
addEventListener('keydown', e => { if (!editMode || /INPUT|SELECT/.test(e.target.tagName)) return; if (e.ctrlKey && e.key.toLowerCase() === 'z') { undo(); e.preventDefault(); } else if (item && e.key === 'Delete') del(); else if (item && e.key.toLowerCase() === 'r') rot(); });
$('eAdd').onclick = () => { const n = $('eType').value, t = ADD[n], x = snap(controls.target.x), z = snap(controls.target.z), a = areaAt(x,z) || areaMap[selected] || areaMap.smt;
  const w = +$('eW').value || t.w, d = +$('eD').value || t.d, h = +$('eH').value || t.h; undoPush(); ctx = a;
  pick({m:() => createMachine({name:n,w,d,h,color:t.c,x,z}), a:() => createAMR({x,z}), r:() => createRack({w,d,h,levels:3,x,z}), f:() => createFIFO({w,d,h,x,z}), w:() => createWorkstation(x,z), t:() => createTrolley(x,z), p:() => createPallet(x,z)}[t.k]()); recount(); };
const sg = () => ({text:$('sText').value || 'AREA', color:$('sColor').value, shape:$('sShape').value, w:+$('sW').value || 8});
$('sAdd').onclick = () => { const x = snap(controls.target.x), z = snap(controls.target.z); undoPush(); ctx = areaAt(x,z) || areaMap[selected] || areaMap.smt; pick(createSign({...sg(),x,z})); };
$('sUpd').onclick = () => { if (!item) return; const s = item.userData.spec, p = item.parent; if (!s || !/createSign|createLabel/.test(s.fn)) return; undoPush(); ctx = {id:p.userData.area}; let n;
  if (s.fn === 'createLabel') n = createLabel($('sText').value,item.position.x,item.position.y,item.position.z,+$('sW').value || 6); else n = createSign({...sg(),x:item.position.x,z:item.position.z,rot:item.rotation.y});
  p.remove(item); pick(n); };
$('editBtn').onclick = e => { editMode = !editMode; e.target.classList.toggle('on',editMode); $('editPanel').hidden = !editMode; if (measuring) $('meas').click(); if (!editMode) pick(null); else info.innerHTML = 'Edit mode: drag objects; Shift+click an area board to edit it'; };
/* --- process tour & auto-rotate --- */
const STEPS = [['SMT process',['smt','smtco','smtpdo','laser']],['MI process (Lines 1–19)',['hs','mi1','mi10','mi18','fut']],['CC process',['cc']],['THT & Seating',['tht','seat']],['Material supply: Warehouse → Parts → Supermarket → MI PDO',['wh','parts','super','mipdo']],['Test, HASS, Quality & Packing',['hass','test','qual','pack']]];
let tourT = null, tourI = 0;
function tourStep() { const [nm,ids] = STEPS[tourI]; if (!$('tKeep').checked || !tourI) D.areas.forEach(a => setAreaVis(a.id,false)); ids.forEach(i => setAreaVis(i,true));
  const c = ids.map(i => areaMap[i].c), x0 = Math.min(...c.map(a => a.x-a.w/2)), x1 = Math.max(...c.map(a => a.x+a.w/2)), z0 = Math.min(...c.map(a => a.z-a.d/2)), z1 = Math.max(...c.map(a => a.z+a.d/2)), cx = (x0+x1)/2, cz = (z0+z1)/2, d = Math.max(x1-x0,z1-z0)*1.05+16, v = VIEWS.iso;
  goal = {t:new THREE.Vector3(cx,0,cz), p:new THREE.Vector3(cx+v[0]*d,v[1]*d,cz+v[2]*d)}; info.innerHTML = `<b>Process tour ${tourI+1}/${STEPS.length}</b><br>${nm}`; tourI = (tourI+1) % STEPS.length; }
$('tourBtn').onclick = e => { if (tourT) { clearInterval(tourT); tourT = null; e.target.classList.remove('on'); e.target.textContent = 'Process tour'; D.areas.forEach(a => setAreaVis(a.id,true)); goal = null; return; }
  tourI = 0; tourStep(); tourT = setInterval(tourStep,5000); e.target.classList.add('on'); e.target.textContent = 'Stop tour'; };
$('rot').onchange = e => { controls.autoRotate = e.target.checked; controls.autoRotateSpeed = 1.5; };
document.addEventListener('fullscreenchange',() => setTimeout(resize,50));
/* --- load saved layout --- */
try { const sv = localStorage.getItem(KEY); if (sv) restore(JSON.parse(sv)); } catch (err) { console.warn('Saved layout not loaded',err); }
/* ===== 6. ROAMING AMR: Warehouse -> MI line 1, back, line 2, ... (route data = plantData.amrRoute) ===== */
(function fleet() { const R = D.amrRoute, steps = []; let st = 0, seg = 0, wt = 0, last = performance.now();
  ctx = {id:'super'}; const amr = createAMR({x:0,z:0}); stats.super.eq--; layerG.machines._root.add(amr); amr.userData = {name:'AMR'};
  const pay = box(amr,.5,.3,.5,0x1565c0,-.28,1.35,0); pay.visible = false;
  const tc = document.createElement('canvas'); tc.width = 512; tc.height = 96; const tt = new THREE.CanvasTexture(tc), tag = new THREE.Sprite(new THREE.SpriteMaterial({map:tt,depthTest:false})); tag.scale.set(4.5,.84,1); tag.position.y = 2.6; tag.renderOrder = 11; amr.add(tag);
  const setTag = t => { const g = tc.getContext('2d'); g.fillStyle = 'rgba(255,196,0,.92)'; g.fillRect(0,0,512,96); g.fillStyle = '#111'; g.font = 'bold 40px Segoe UI,Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(t,256,50,490); tt.needsUpdate = true; };
  const v3 = (px,py) => new THREE.Vector3(wx(px),0,wz(py)), pk = v3(R.pickup[0],R.pickup[1]);
  steps.push({pts:[pk],act:'load',tag:'AMR: Loading @ Warehouse',done:'AMR: Loading @ Warehouse'});
  R.lines.forEach(L => { const a = areaMap[L.area], Ln = a.lines, ins = Ln.inset || [0,0], pitch = (a.c.d-(ins[0]+ins[1])*S)/Ln.count;
    for (let i = 0; i < Ln.count; i++) { const z = a.c.z-a.c.d/2+ins[0]*S+pitch*(i+.5), top = v3(L.aisleX,R.pickup[1]), tg = new THREE.Vector3(wx(L.aisleX),0,z), no = Ln.no+i;
      steps.push({pts:[pk,top,tg],act:'unload',tag:'→ MI Line '+no,done:'Replenishing MI Line '+no});
      steps.push({pts:[tg,top,pk],act:'load',tag:'→ Warehouse (restock)',done:'Loading @ Warehouse'}); } });
  amr.position.copy(pk); setTag(steps[0].tag);
  window.amrObj = amr;
  (function tick(n) { requestAnimationFrame(tick); const dt = Math.min(.1,(n-last)/1000); last = n; const s = steps[st];
    if (window.followAMR) { const f = amr.position.clone().sub(controls.target); controls.target.add(f); camera.position.add(f); }
    if (wt > 0) { wt -= dt; if (wt <= 0) { st = (st+1) % steps.length; seg = 0; setTag(steps[st].tag); } return; }
    if (seg >= s.pts.length-1) { pay.visible = s.act === 'load'; setTag(s.done); wt = R.wait; return; }
    const t = s.pts[seg+1], d = t.clone().sub(amr.position), l = d.length(), step = R.speed*dt;
    if (l > .01) { const h = -Math.atan2(d.z,d.x), a = amr.rotation.y; amr.rotation.y = a+Math.atan2(Math.sin(h-a),Math.cos(h-a))*Math.min(1,dt*8); }
    if (step >= l) { amr.position.copy(t); seg++; } else amr.position.addScaledVector(d,step/l); })(last); })();
/* --- Follow AMR button: camera tracks the AMR; orbit/zoom still work while following --- */
$('follow').onclick = e => { window.followAMR = !window.followAMR; e.target.classList.toggle('on',window.followAMR); e.target.textContent = window.followAMR ? 'Stop following' : 'Follow AMR';
  if (window.followAMR) { goal = null; const p = window.amrObj.position; controls.target.copy(p); camera.position.set(p.x-9,6,p.z+9); } };