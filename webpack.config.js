const path = require('path');

module.exports = {
    entry: './src/assets/js/index.js',
    output: {
        path: path.resolve(__dirname, '_site/assets/js'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    }
                }
            }
        ]
    },
    plugins: [
    ]
}
