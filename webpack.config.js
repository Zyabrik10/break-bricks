import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function WebpackConfiguration(env) {
  return {
    mode: env.development ? "development" : "production",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./build"),
      filename: "index.buble.js",
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: "babel-loader",
        },
        {
          test: /\.m?js/,
          type: "javascript/auto",
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
      }),
      new CopyPlugin({
        patterns: ["./src/styles"],
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      port: 3000,
    },
  };
}
