// core module : file system
const fs = require('fs');

// core module : read line
const readline = require('readline');

// membuat promptnya/ inisiasi
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const dirPath = './data';
// cek apakah tidak ada folder bernama data
if(!fs.existsSync(dirPath)) {
    
    // kalau tidak ada buat folder bernama data 
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
// cek apakah tidak ada file contacts.json di folder data
if(!fs.existsSync(dataPath)) {
    
    // kalau tidak ada buat file bernama contacts.json, lalu isi dengan array kosong ( [] )
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}


// buat variabel pertanyaan berisi fungsi yang mengembalikan Promise yang berisi pertanyaan
// resolve : kalau berhasil
// reject : kalau gagal

// buat fungsi tulisPertanyaan yang menerima parameter pertanyaan
const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {

        // tampilkan pertanyaan lalu tangkap hasil jawabannya di variabel dataJawaban
        rl.question(pertanyaan, (dataJawaban) => {
            
            // kondisi berhasil, kembalikan nilai dataJawaban
            resolve(dataJawaban);
        });
    });
};

// buat fungsi simpanContact yang menerima parameter
const simpanContact = (nama, email, noHp) => {

    // buat object dengan nama contact, isi dengan variabel nama, noHp dan email
    const contact = { nama, email, noHp };

    //  buat const dengan nama file isi dengan membaca file contact.json
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

};


// export fungsi tulisPertanyaan dan simpanContact ke file lain
module.exports = { tulisPertanyaan, simpanContact };