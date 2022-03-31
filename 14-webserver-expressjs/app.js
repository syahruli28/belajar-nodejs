// const fs = require('fs');
// const http = require('http');

// const port = 3000;

// http.createServer((req, res) => {

//     res.writeHead(200, { // jika status berhasil (200), maka buat kontennya menjadi tipe html
//         'Content-Type': 'text/html',
//     });

//     const url = req.url; // buat variabel diisi dari request uri

//     const renderHtml = (path, res) => { // fungsi untuk menampilkan file html, seiring dengan res dan path filenya
//         fs.readFile(path, (err, data) => { // baca data file
//             if(err) { // kalau gagal
//                 res.writeHead(404);
//                 res.write('Error : file not found');
//             } else { // kalau berhasil, data sudah terisi data file yang diambil
//                 res.write(data);
//             }
//             res.end();
//         });
//     };

//     // // CARA IF
//     // if(url === '/about') {
//     //     renderHtml('./about.html', res);
//     // }else if(url === '/contact'){
//     //     renderHtml('./contact.html', res);
//     // }else{
//     //     renderHtml('./index.html', res);  
//     // }

//     // CARA SWITCH
//     switch(url){
//         case '/about':
//             renderHtml('./about.html', res);
//             break;
//         case '/contact':
//             renderHtml('./contact.html', res);
//             break;
//         default:
//             renderHtml('./index.html', res);
//             break;
//     }
// }).listen(port, () => {
//     console.log(`Server is listening on port ${port}..`);
// });

const express = require('express')
const app = express()
const port = 3000

// get : menangkap route request urlnya
app.get('/', (req, res) => {
    //   res.send('Hello World!') // tampilkan text 

    // sendFile untuk kirim file, parameter kedua diisi agar tahu folder rootnya
    res.sendFile('./index.html', {root: __dirname}); 
})
app.get('/json', (req, res) => {
  res.json({ // tampilkan dalam format json
    nama: 'Aqil',
    email: 'aqil@gmail.com',
    noHp: '0988898912'
  }) 
})
app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root: __dirname});
})
app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', {root: __dirname});
})


app.get('/product/:id', (req, res) => { // :nama_requestnya_yang_akan_diminta
    res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`) 
    // req.param.nama_requestnya, cth urlnya : index.html/product/12
    // req.query.nama_data_yang_dikirimkan, cth urlnya : index.html?category=shoes
})

// use : kalau req urlnya tidak ada tampilkan ini, harus ditaruh paling bawah (dibawah app.get)
app.use('/', (req, res) => {
    res.status(404) // memberi status 404 di network inspect
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})