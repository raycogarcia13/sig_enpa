module.exports = {
    apps : [{
      name: "sig_contratacion",
      script: "./contratacion_api/index.js",
      env: {
        NODE_ENV:'PRODUCTION',
        PORT:'4001'
      },
    }, {
        name: "sig_seguridad",
        script: "./seguridad_api/index.js",
        env: {
          NODE_ENV:'PRODUCTION',
          PORT:'4000'
        }
    },{
        name: "frontend",
        script: "./app/index.js",
        env: {
          NODE_ENV: "PRODUCTION",
          PORT:'4050'
        }
      }
    ]
  }