const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((email, context) => {
    // check request is made bt an admin
    if (context.auth.token.admin !== true) {
      return '엿머겅ㅋㅋ'
    }

    // get user and add custom claim(admin)
    return admin.auth().getUserByEmail(email).then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      }).then(() => {
        return {
          message: `"${email}"에게 관리자권한 부여`
        }
      }).catch(err => {
        return {
          message: err.message
        }
      })
    }).catch(err => {
      return {
        message: err.message
      }
    })
});

exports.checkAdmin = functions.https.onCall((uid, context) => {
  return admin.auth().getUser(uid).then((userRecord) => {
    return userRecord.customClaims.admin
  }).catch(err => {
    return err.message
  })
})