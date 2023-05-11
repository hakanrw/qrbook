const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v1/https");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

const createPage = async (data, context) => {
  if (!context.auth) return { message: "you need to authorize", status: "error" };
  
  let authorName = context.auth.token.name || null;
  let authorPicture = context.auth.token.picture || null;
  const author = context.auth.uid;

  const isAdmin = context.auth.token.email === "imparatorahmett@gmail.com";

  const db = getFirestore();

  // SPAM PROTECTION BEGIN
  const spamProtection = await Promise.all([
    db.collection("messages").where("author", "==", author).orderBy("createdAt", "desc").limit(1).get(),
    db.collection("messages").where("author", "==", author).where("createdAt", ">=", Date.now() - 60 * 60 * 1000).count().get(),
    db.collection("server").doc("status").get(),
  ]);

  if (spamProtection[2].data() && spamProtection[2].data().code === "down" && !isAdmin) {
    return { message: "server is temporarily closed", status: "error" };
  }
  
  if (spamProtection[1].data().count >= 2) {
    return { message: "you can create 2 pages in an hour maximum.", status: "error" };
  }

  const lastPage = await spamProtection[0];
  let recentPage = false;

  lastPage.forEach(doc => {
    if (Date.now() - doc.get("createdAt") < 8000) recentPage = true;
  });
  if (recentPage) return { message: "you are too fast", status: "error" };
  
  // SPAM PROTECTION END


  if (isAdmin) {
    // TODO
  }

  // DATA CHECK

  let pageData = data.data;
  let badData = false;

  if (!Array.isArray(pageData)) badData = true
  if (typeof(data.title) !== "string") badData = true;

  for (oneData of pageData) {
    if (["kvpair", "image", "text"].includes(oneData.type) === false) badData = true;
    if (typeof(oneData.value) !== "string" && oneData.type !== "kvpair") badData = true;
    if (oneData.type === "kvpair") {
      if (!Array.isArray(oneData.value) || !oneData.value.every(g => Array.isArray(g) && g.every(ge => typeof(ge) === "string"))) badData = true;
      else {
        oneData.value = Object.fromEntries(oneData.value);
      }
    }
  }

  if (badData) {
    return { message: "you sent an unknown data type", status: "error" };
  }

  if (pageData.length > 10) {
    return { message: "your page has more than 10 entries", status: "error" };
  }
  if (pageData.length === 0) {
    return { message: "your page should contain something", status: "error" };
  }

  if (data.title.length > 40 || data.title.length === 0) {
    return { message: "title should be between 1 and 40 characters", status: "error" };
  }

  // DATA CHECK END

  let url = data.title.replace(/[^a-z0-9_-]/gi, '-').toLowerCase() + "--" + Math.floor(Math.random() * 100000);

  await db
    .collection("pages")
    .doc(url)
    .set({ pageData, author, authorName, authorPicture, createdAt: Date.now()});

  return { url, message: "successfully created page", status: "success" };
}

module.exports = {
  createPage: functions.region("europe-west1").https.onCall(createPage),
}