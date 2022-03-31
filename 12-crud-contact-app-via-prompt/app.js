const yargs = require("yargs");
const contacts = require("./contacts");

// fungsi tambah data dengan yargs
yargs.command({
    command: 'add', // keyword commandnya
    describe: 'Menambahkan contact baru', // deskripsi dari keyword commandnya
    builder: { // builder : digunakan untuk macam macam argument yang akan dikirim
        nama: {
            describe: 'Nama lengkap', // deskripsi dari argument nama
            demandOption: true, // apakah argument nama wajib diisi
            type: 'string', // tipe argument dari nama apa?
        },
        email: {
            describe: 'Alamat Email',
            demandOption: false,
            type: 'string',
        },
        noHp: {
            describe: 'Nomor Telepon',
            demandOption: true,
            type: 'string',
        },
    },

    handler(argv) { // handler : untuk menjalankan fungsi yang akan dilakukan pada comman line utama, handler menerima parameter argv

        // jalankan fungsi simpanContact juga mengirim parameter
        contacts.simpanContact(argv.nama, argv.email, argv.noHp);

    }
}).demandCommand(); // demandCommand : agar program yang dijalankan harus ada commandnya (cth: add, delete, list dll)


// fungsi menampilkan data dengan yargs
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua data nama & No. Hp',
    handler() {
        contacts.listContact();
    }
});


// fungsi detail sebuah contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        }
    }, 
    handler(argv) {
        contacts.detailContact(argv.nama);
    }
});


// fungsi hapus data
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        }
    }, 
    handler(argv) {
        contacts.deleteContact(argv.nama);
    }
});


yargs.parse();