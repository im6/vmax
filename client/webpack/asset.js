var webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = "127.0.0.1",
  PORT = "3000",
  antDir = process.platform === 'win32' ? /node_modules\\antd\\lib/ :  /node_modules\/antd\/lib/,
  VENDORS = [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux-saga',
    'immutable'
  ];

var commonsChunk = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: 'vendor.js',
  minChunks: Infinity
});

var baseTemplate = {
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};


var rules = [
  {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader']
  },
  {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
    include: antDir
  },

  {
    test: /\.less$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      },
      'less-loader'
    ],
    exclude: antDir
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      },
      {
        loader: 'autoprefixer-loader',
        options: {
          browsers: 'last 2 versions'
        }
      },
    ],
  },
  {
    test: /\.(gif|png|jpg|jpeg)($|\?)/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ],
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      }
    ],
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: ['file-loader']
  }
];



var plugins = {
  hot: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    commonsChunk
  ],
  watch: [
    new HtmlWebpackPlugin({
      title: 'VMAX',
      template: './client/template/index.html',
      favicon: './client/content/img/favicon2.ico',
      showErrors: false
    }),
    commonsChunk,
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  build: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mange:{
        "screw-ie8" : true
      },
      compress : {
        "screw_ie8" : true,
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new HtmlWebpackPlugin({
      title: 'VMAX',
      template: 'client/template/index.html',
      favicon: './client/content/img/favicon2.ico',
      hash:true,
      showErrors: false
    }),
    commonsChunk
  ]
};

var entry = {
    hot:{
      app: [
        'webpack-dev-server/client?http://' + HOST + ':' + PORT,
        'webpack/hot/only-dev-server',
        './client/entry/index.jsx'
      ],
      vendor: VENDORS
    },
    watch:{
      app: ['./client/entry/index.jsx'],
      vendor: VENDORS
    },
    build:{
      app: ['./client/entry/index.jsx'],
      vendor: VENDORS
    }
};


module.exports = {
  rules: rules,
  plugins: function(mode){
      return plugins[mode]
  },
  entry: function(mode){
      return entry[mode];
  },
  template: baseTemplate,
  constant: {
    port: PORT,
    host: HOST
  }
};
