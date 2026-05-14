
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
    'index.csr.html': {size: 31989, hash: '5af8f4686a3e5ff7f80e3163ece062151dd6cd7d1fd63805532368d9b9d317aa', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2221, hash: 'f312a7a2c069d663dcfc21364f12e7481d5cbe4307c1aad4596eb50fe64959d9', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'terminos-y-condiciones/index.html': {size: 51148, hash: '83b408a540869a1a39e9b1fa845aad5d211811404684137355921ff0b3e77cff', text: () => import('./assets-chunks/terminos-y-condiciones_index_html.mjs').then(m => m.default)},
    'aviso-de-privacidad/index.html': {size: 51195, hash: 'e31da0fc6a734d769e5aa923d1829ca624223a84c87376c08bc4e762593ab038', text: () => import('./assets-chunks/aviso-de-privacidad_index_html.mjs').then(m => m.default)},
    'index.html': {size: 106107, hash: 'a0bf762e569e1cf6c5fcaf29f35e010eba9acb2d2632173fd140bb8a09b558f1', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'catalogo/index.html': {size: 98018, hash: 'ce01eada22ffb275f596ee6586db14f64e0b2f7486e0ea2cbc3d03f7be532959', text: () => import('./assets-chunks/catalogo_index_html.mjs').then(m => m.default)},
    'styles-UPTMFLEH.css': {size: 71189, hash: 'XD5EG44TwNI', text: () => import('./assets-chunks/styles-UPTMFLEH_css.mjs').then(m => m.default)}
  },
};
