// core module : file system
const fs = require('fs');

// third-party modules
const chalk = require('chalk');
const validator = require('validator');

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

// fungsi loadContact
const loadContact = () => {

    //  buat const dengan nama file isi dengan membaca file contact.json
    const file = fs.readFileSync('data/contacts.json', 'utf-8');

    // buat variabel contacts diisi dengan variabel file yang sudah di ubah ke format json
    const contacts = JSON.parse(file);

    return contacts;
}

// buat fungsi simpanContact yang menerima parameter
const simpanContact = (nama, email, noHp) => {

    // buat object dengan nama contact, isi dengan variabel nama, noHp dan email
    const contact = { nama, email, noHp };

    // buat variabel contacts isi dengan fungsi loadContact
    const contacts = loadContact();

    // cek apakah argument nama yang diberikan sudah ada pada file contacts.js
    const duplikat = contacts.find((contact) => contact.nama === nama );
    if(duplikat) { // jika nama sudah ada
        console.log(chalk.red.inverse.bold( // tampilkan
            'Contact sudah terdaftar, gunakan nama lain!'
            )); 
        return false; // keluar 
    }

    // cek argument email
    if(email) { // jika argument email diisi
        if(!validator.isEmail(email)) { // cek apakah email valid
            console.log(chalk.red.inverse.bold( // tampilkan
                'Email tidak valid!'
                )); 
            return false; // keluar 
        };
    }; //else if(!email) { // jika argument email tidak diisi
        //contact.email = '-'; // isi variabel
    //};

    // cek no hp
    if(!validator.isMobilePhone(noHp, 'id-ID')) { // cek apakah no hp valid
        console.log(chalk.red.inverse.bold( // tampilkan
            'Nomor HP tidak valid!'
            )); 
        return false; // keluar
    };

    // push variabel nama dan noHp kedalam object contact
    contacts.push(contact);

    // tulis data yang telah diinputkan kedalam file contact.json
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2)) // kembalikan ke string (json)

    //
    console.log(chalk.green.inverse.bold('Contact baru sudah ditambahkan.'));

};


// fungsi list contact
const listContact = () => {
    
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Daftar contact : '));
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.noHp}`);
    });
};


// fungsi detail contact
const detailContact = (nama) => {
    
    const contacts = loadContact();

    // cari data yang diinput pada file contact, bila ada masukkan kevariabel contact
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase() );
    if(!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    };

    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.noHp);
    if(contact.email){
        console.log(contact.email);
    }

};


// fungsi deleteContact
const deleteContact = (nama) => {

    const contacts = loadContact();
    
    // masukan semua data ke data baru kecuali argument nama yang dikirimkan
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase() );

    if(contacts.length === newContacts.length) { // cek apakah data lama dengan data baru memiliki perbedaan isi/panjang
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    };

    // tulis data yang telah diinputkan kedalam file contact.json
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts, null, 2)) // kembalikan ke string (json)
    console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus.`));
    listContact();

};



// export fungsi tulisPertanyaan dan simpanContact ke file lain
module.exports = { simpanContact, listContact, detailContact, deleteContact };