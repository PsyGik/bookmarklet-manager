export const TERSER_CONFIG = {
  compress: {
    dead_code: true,
    drop_console: true,
    drop_debugger: true,
    keep_classnames: false,
    keep_fargs: true,
    keep_fnames: false,
    keep_infinity: false
  },
  mangle: {
    eval: false,
    keep_classnames: false,
    keep_fnames: false,
    toplevel: true,
    safari10: false,
    properties: {
      debug: false
    }
  },
  module: false,
  sourceMap: false,
  output: {
    comments: 'some'
  }
};

export const SPECIAL_CHARACTERS = [
  '%',
  '"',
  '<',
  '>',
  '#',
  '@',
  '\\s',
  ' ',
  '\\&',
  '\\?'
];
