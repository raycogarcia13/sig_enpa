module.exports = {
    apps : [{
      name: "sig_contratacion",
      script: "./contratacion_api/index.js",
      env: {
        NODE_ENV:'production',
        PORT:'4001'
      },
    }, {
        name: "sig_seguridad",
        script: "./seguridad_api/index.js",
        env: {
          NODE_ENV:'production',
          PORT:'4000'
        }
    },{
        name: "sig_frontend",
        script: "cd sig_frontend && yarn",
        args:"start",
        env: {
          NODE_ENV: "development",
          PORT:'4050'
        }
      }
    ]
  }