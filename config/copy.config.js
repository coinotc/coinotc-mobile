// New copy task for font files
module.exports = {
    copyFontAwesome: {
      src: ['{{ROOT}}/node_modules/font-awesome/fonts/**/*'],
      dest: '{{WWW}}/assets/fonts'
    },
    copyCssAwesome: {
      src: ['{{ROOT}}/node_modules/font-awesome/css/**/*'],
      dest: '{{WWW}}/assets/css'
    }
  };