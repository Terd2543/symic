import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// 👇 เปลี่ยนเป็น firebaseConfig ของเฟมเองนะ
const firebaseConfig = {
    apiKey: "AIzaSyD40kcFdCmRm6Zd_kTpU9lT1-HLmStzYhA",
    authDomain: "symic-d7196.firebaseapp.com",
    projectId: "symic-d7196",
    storageBucket: "symic-d7196.firebasestorage.app",
    messagingSenderId: "835880076541",
    appId: "1:835880076541:web:4a6816fb52ff91ae1c2a94",
    measurementId: "G-ZTTCB5YKFR"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function postCode() {
  const code = document.getElementById("codeInput").value;
  const lang = document.getElementById("languageSelect").value;
  const imageFile = document.getElementById("imageInput").files[0];

  let imageUrl = null;

  if (imageFile) {
    const imageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(imageRef, imageFile);
    imageUrl = await getDownloadURL(snapshot.ref);
  }

  await addDoc(collection(db, "posts"), {
    code,
    lang,
    imageUrl,
    createdAt: new Date()
  });

  document.getElementById("codeInput").value = "";
  document.getElementById("imageInput").value = "";
  loadPosts();
}

async function loadPosts() {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    const post = doc.data();
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    const codeBlock = document.createElement("pre");
    const codeElement = document.createElement("code");
    codeElement.className = post.lang;
    codeElement.textContent = post.code;

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "📋 คัดลอก";
    copyBtn.className = "copy-btn";
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(post.code);
      copyBtn.textContent = "✅ คัดลอกแล้ว!";
      setTimeout(() => copyBtn.textContent = "📋 คัดลอก", 1500);
    };

    codeBlock.appendChild(codeElement);
    postDiv.appendChild(copyBtn);
    postDiv.appendChild(codeBlock);

    if (post.imageUrl) {
      const img = document.createElement("img");
      img.src = post.imageUrl;
      postDiv.appendChild(img);
    }

    container.prepend(postDiv);
    hljs.highlightElement(codeElement);
  });
}

window.onload = loadPosts;

