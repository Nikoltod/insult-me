 module.exports = {
     entry: './public/javascripts/main.js',
     output: {
         path: './public',
         filename: 'app.bundle.js',
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                  presets: ['es2015']
             }
         }]
     }
 }

////***For webpack-dev-server ***

// var path = require("path");
// module.exports = {
//   entry: {
//     app: ["./public/javascripts/main.js"]
//   },
//   output: {
//     path: path.resolve(__dirname, "public"),
//     publicPath: "/assets/",
//     filename: "bundle.min.js"
//   }
// };