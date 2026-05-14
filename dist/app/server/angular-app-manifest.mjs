
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/catalogo"
  },
  {
    "renderMode": 0,
    "route": "/catalogo/*"
  },
  {
    "renderMode": 2,
    "route": "/aviso-de-privacidad"
  },
  {
    "renderMode": 2,
    "route": "/terminos-y-condiciones"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 32095, hash: '393b559e44ccb1b26af992628b648ad839dada60ad7d1c652f6e35de907a980d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2221, hash: '9bbf0ea81198a6042b928ac71ea1328a404667101953344256b3bd6999492db2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'terminos-y-condiciones/index.html': {size: 51259, hash: '69065af9b996f0b71ec67cb55a2ae833b4e08a0859beeae5cc30aea2dc45963f', text: () => import('./assets-chunks/terminos-y-condiciones_index_html.mjs').then(m => m.default)},
    'aviso-de-privacidad/index.html': {size: 51306, hash: '704f0a5f92e73828ccb6c56ead7ec8e22d0467517ca2f363079e38527f8210a7', text: () => import('./assets-chunks/aviso-de-privacidad_index_html.mjs').then(m => m.default)},
    'index.html': {size: 106254, hash: '42a55135eba99fb543945418a89746a2aea3ad3e352081e6631cab310c000658', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'catalogo/index.html': {size: 98129, hash: '5938378236175e3a9621510a4da26d1a350046891694eb1b51eddc4102f39bb5', text: () => import('./assets-chunks/catalogo_index_html.mjs').then(m => m.default)},
    'styles-F2HCRSD5.css': {size: 74026, hash: 'lHI+gwPS7Yo', text: () => import('./assets-chunks/styles-F2HCRSD5_css.mjs').then(m => m.default)}
  },
};
