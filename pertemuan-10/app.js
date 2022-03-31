// ambil (import) fungsi dari file contacts.js
const {tulisPertanyaan, simpanContact } = require('./contacts')

// buat fungsi main yang menampung fungsi yang memiliki sifat asynchronous (async, await)
const main = async () => {

    const nama = await tulisPertanyaan('Masukkan Nama Anda : ');
    const email = await tulisPertanyaan('Masukkan Email Anda : ');
    const noHp = await tulisPertanyaan('Masukkan No. HP Anda : ');

    // kirim data ke fungsi simpanContact
    simpanContact(nama, email, noHp);

};

main();