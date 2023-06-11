const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: isProduction,
        useBuiltIns: 'usage',
        corejs: 3.3
      }
    ]
  ]
};
