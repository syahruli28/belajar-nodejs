// core module : file system
const fs = require('fs');

// core module : read line
const readline = require('readline');


// menuliskan string ke dalam file (synchronous)
// parameter pertama nama file, parameter kedua isi filenya
// try {
//     fs.writeFileSync('data/test.txt', 'oy2');
// } catch (e) {
//     console.log(e);
// }

// menuliskan string ke dalam file (asynchronous)
// jalankan perintah kalau error, tampilkan errornya
// fs.writeFile('data/test.txt', 'asin', (e) => {
//     console.log(e);
// });

// membaca isi file (synchronous)
// console.log(fs.readFileSync('data/test.txt', 'utf-8'));

// membaca isi file (asynchronous)
// parameter pertama errornya, parameter kedua hasilnya
// fs.readFile('data/test.txt', 'utf-8', (e, data) => {
//     // kalau error, tampilkan errornya lalu keluar dari program
//     if(e) throw e;
//     // kalau berhasil tampilkan hasilnya
//     console.log(data)
// });

// membuat promptnya/ inisiasi
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukan Nama Anda : ', (nama) => {
    rl.question('Masukan No. HP Anda : ', (noHp) => {

        // buat object dengan nama contact, isi dengan variabel nama dan noHp
        const contact = { nama, noHp };

        // buat const dengan nama file isi dengan membaca file contact.json
        const file = fs.readFileSync('data/contacts.json', 'utf-8');

        // buat variabel contacts diisi dengan variabel file yang sudah di ubah ke format json
        const contacts = JSON.parse(file);

        // push variabel nama dan noHp kedalam object contact
        contacts.push(contact);

        // tulis data yang telah diinputkan kedalam file contact.json
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2)) // kembalikan ke string (json)

        //
        console.log('Selesai.')

        // tutup prompt
        rl.close();
    });

});