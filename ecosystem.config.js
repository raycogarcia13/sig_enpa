module.exports = {
    apps : [{
      name: "sig_contratacion",
      script: "./contratacion_api/index.js",
      env: {
        NODE_ENV:'PRODUCTION',
        PORT:'4001',
        DATABASE_URI:'mongodb://localhost:27017/sig_contratation',

        JWT_SECRET : 'KJHASRDA798QJHNIOU89079JLKAS0 ',
        JWT_EXPIRESTIME : '7d',

        COOKIE_EXPIRES_TIME : '7'
      },
    }, {
        name: "sig_seguridad",
        script: "./seguridad_api/index.js",
        env: {
          NODE_ENV:'PRODUCTION',
          PORT:'4000',
          DATABASE_URI:'mongodb://localhost:27017/sig_security',
          JWT_SECRET : 'KJHASRDA798QJHNIOU89079JLKAS0 ',
          JWT_EXPIRESTIME : '7d',

          COOKIE_EXPIRES_TIME : '7',

          MAIL_HOST: 'correo.enpa.iju.minag.cu',
          MAIL_PORT: '25',
          MAIL_USERNAME: 'geomatica@enpa.iju.minag.cu',
          MAIL_PASSWORD: 'Kronosk13',

          LDAP_DOMAIN : '@enpa.iju.minag.cu',
          LDAP_URI : 'ldap://172.16.212.8',
          LDAP_DN : 'DC=enpa,DC=iju,DC=minag,DC=cu',
          LDAP_USER : 'webmail@enpa.iju.minag.cu',
          LDAP_PASS : 'Enpa2018*',
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