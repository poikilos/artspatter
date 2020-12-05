module.exports = {
    purge: [
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/*.ts',
      'src/**/*.tsx',
      'public/**/*.html',
    ],
    theme: {
      extend: {},
    },
    variants: {},
    plugins: [],
  }

  // as per <https://daveceddia.com/tailwind-create-react-app/>
  // Non-defaults:
  // - purge: remove unused css classes
  // More defaults:
  // to get an example file, run:
  //   npx tailwind init tailwind.config.example.js --full