const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');
// gunakan express-ejs-layouts (untuk layouting)
app.use(expressLayouts);

// get : menangkap route request urlnya
app.get('/', (req, res) => {
    //   res.send('Hello World!') // tampilkan text 

    // sendFile untuk kirim file, parameter kedua diisi agar tahu folder rootnya
    // res.sendFile('./index.html', {root: __dirname}); 

    const mahasiswa = [
      {
        nama: 'Aqil Emeraldi',
        email: 'aqil@gmail.com'
      },
      {
        nama: 'Erik',
        email: 'erk@gmail.com'
      },
      {
        nama: 'Doddy',
        email: 'doddy@gmail.com'
      }
    ]

    res.render('index', {layout: 'layouts/main-layout', nama: 'Aqil Emeraldi', title: 'Halaman Home', mahasiswa}); // mengirimkan file ke browser via view engine EJS, pada folder views(default)
    // parameter kedua pada fungsi render untuk mengirim data
    // layout: 'layouts/main-layout' : kalau mau pakai layouting dari express-ejs-layouts
})
app.get('/json', (req, res) => {
  res.json({ // tampilkan dalam format json
    nama: 'Aqil',
    email: 'aqil@gmail.com',
    noHp: '0988898912'
  }) 
})
app.get('/about', (req, res) => {
  res.render('about', {layout: 'layouts/main-layout', title: 'Halaman About'});
})
app.get('/contact', (req, res) => {
  res.render('contact', {layout: 'layouts/main-layout', title: 'Halaman Contact'});
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