hljs.highlightAll();

function postCode() {
  const code = document.getElementById('codeInput').value;
  const lang = document.getElementById('languageSelect').value;
  const imageFile = document.getElementById('imageInput').files[0];

  const postDiv = document.createElement('div');
  postDiv.className = 'post';

  const codeBlock = document.createElement('pre');
  const codeElement = document.createElement('code');
  codeElement.className = lang;
  codeElement.textContent = code;

  const copyBtn = document.createElement('button');
  copyBtn.textContent = '📋 คัดลอก';
  copyBtn.className = 'copy-btn';
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(code).then(() => {
      copyBtn.textContent = '✅ คัดลอกแล้ว!';
      setTimeout(() => (copyBtn.textContent = '📋 คัดลอก'), 1500);
    });
  };

  codeBlock.appendChild(codeElement);
  postDiv.appendChild(copyBtn);
  postDiv.appendChild(codeBlock);

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      postDiv.appendChild(img);
    };
    reader.readAsDataURL(imageFile);
  }

  document.getElementById('postsContainer').prepend(postDiv);
  hljs.highlightElement(codeElement);

  // reset form
  document.getElementById('codeInput').value = '';
  document.getElementById('imageInput').value = '';
}
