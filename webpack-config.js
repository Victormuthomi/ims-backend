import path from "path";
import nodeExternals from "webpack-node-externals";

export default {
  target: "node",
  entry: "./server.js", // Entry point for your app
  output: {
    path: path.resolve("dist"),
    filename: "server.bundle.js",
  },
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  module: {
    rules: [
      {
        test: /\.js$/, // Apply Babel loader to JavaScript files
        exclude: /node_modules/, // Exclude node_modules from Babel transpilation
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
};
