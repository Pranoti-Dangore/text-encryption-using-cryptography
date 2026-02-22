function encryptText() {
    let text = document.getElementById("inputText").value;
    let key = document.getElementById("secretKey").value;

    if (text === "" || key === "") {
        alert("Please enter text and key");
        return;
    }

    // Random salt
    let salt = CryptoJS.lib.WordArray.random(128 / 8);

    // Generate key from password
    let derivedKey = CryptoJS.PBKDF2(key, salt, {
        keySize: 256 / 32,
        iterations: 1000
    });

    // Random IV
    let iv = CryptoJS.lib.WordArray.random(128 / 8);

    let encrypted = CryptoJS.AES.encrypt(text, derivedKey, { iv: iv });

    let result = salt.toString() + ":" + iv.toString() + ":" + encrypted.toString();

    document.getElementById("outputText").value = result;
}

function decryptText() {
    let encryptedData = document.getElementById("inputText").value;
    let key = document.getElementById("secretKey").value;

    try {
        let parts = encryptedData.split(":");

        let salt = CryptoJS.enc.Hex.parse(parts[0]);
        let iv = CryptoJS.enc.Hex.parse(parts[1]);
        let encrypted = parts[2];

        let derivedKey = CryptoJS.PBKDF2(key, salt, {
            keySize: 256 / 32,
            iterations: 1000
        });

        let decrypted = CryptoJS.AES.decrypt(encrypted, derivedKey, { iv: iv });

        document.getElementById("outputText").value =
            decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        alert("Invalid encrypted text");
    }
}