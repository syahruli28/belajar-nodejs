const fs = require('fs');
const http = require('http');

const port = 3000;

http.createServer((req, res) => {

    res.writeHead(200, { // jika status berhasil (200), maka buat kontennya menjadi tipe html
        'Content-Type': 'text/html',
    });

    const url = req.url; // buat variabel diisi dari request uri

    const renderHtml = (path, res) => { // fungsi untuk menampilkan file html, seiring dengan res dan path filenya
        fs.readFile(path, (err, data) => { // baca data file
            if(err) { // kalau gagal
                res.writeHead(404);
                res.write('Error : file not found');
            } else { // kalau berhasil, data sudah terisi data file yang diambil
                res.write(data);
            }
            res.end();
        });
    };

    // // CARA IF
    // if(url === '/about') {
    //     renderHtml('./about.html', res);
    // }else if(url === '/contact'){
    //     renderHtml('./contact.html', res);
    // }else{
    //     renderHtml('./index.html', res);  
    // }

    // CARA SWITCH
    switch(url){
        case '/about':
            renderHtml('./about.html', res);
            break;
        case '/contact':
            renderHtml('./contact.html', res);
            break;
        default:
            renderHtml('./index.html', res);
            break;
    }
}).listen(port, () => {
    console.log(`Server is listening on port ${port}..`);
});