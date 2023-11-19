var hargaBarang = 0;
var jumlahBarang = 0;
var diskonBarang = 0;

function hitungharga() {
  var kategori = document.getElementById('kategori').value;
  var jumlah = document.getElementById('jumlah').value;
  var harga = document.getElementById('harga');
  var diskon = document.getElementById('diskon');

  diskonBarang = jumlah > 3 ? 10 : 0;

  switch (kategori) {
    case 'Pakaian':
      hargaBarang = 8000;
      break;
    case 'Karpet':
      hargaBarang = 25000;
      break;
    case 'Seprai':
      hargaBarang = 15000;
      break;
    case 'Selimut':
      hargaBarang = 10000;
      break;
    case 'Bantal':
      hargaBarang = 5000;
      break;
    case 'Handuk':
      hargaBarang = 7000;
      break;
  }

  jumlahBarang = jumlah;
  var totalHarga = jumlahBarang * hargaBarang;
  var hargaDiskon = totalHarga - totalHarga * (diskonBarang / 100);
  harga.value = hargaDiskon;
  diskon.value = diskonBarang;
}

function allData() {
  var table = document.getElementById('table');
  var contactList = JSON.parse(localStorage.getItem('listItem')) || [];

  table.innerHTML = '';
  contactList.forEach(function (value, i) {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${value.name}</td>
        <td>${value.age}</td>
        <td>${value.address}</td>
        <td>${value.phone}</td>
        <td>${value.kategori}</td>
        <td>${value.jumlah}</td>
        <td>${value.diskon}%</td>
        <td>${value.harga}</td>
        <td>
          <button class="btn btn-sm btn-success" onclick="find(${value.id})">
            <i class="fa fa-edit"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="removeData(${value.id})">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>`;
  });
}

function save() {
  var contactList = JSON.parse(localStorage.getItem('listItem')) || [];
  var id = contactList.length != 0 ? contactList[contactList.length - 1].id : 0;

  if (document.getElementById('id').value) {
    contactList.forEach((value) => {
      if (document.getElementById('id').value == value.id) {
        value.name = document.getElementById('name').value;
        value.age = document.getElementById('age').value;
        value.address = document.getElementById('address').value;
        value.phone = document.getElementById('phone').value;
        value.kategori = document.getElementById('kategori').value;
        value.jumlah = document.getElementById('jumlah').value;
        value.diskon = document.getElementById('diskon').value;
        value.harga = document.getElementById('harga').value;
      }
    });

    document.getElementById('id').value = '';
  } else {
    var item = {
      id: id + 1,
      name: document.getElementById('name').value,
      age: document.getElementById('age').value,
      address: document.getElementById('address').value,
      phone: document.getElementById('phone').value,
      kategori: document.getElementById('kategori').value,
      jumlah: document.getElementById('jumlah').value,
      diskon: document.getElementById('diskon').value,
      harga: document.getElementById('harga').value,
    };

    contactList.push(item);
  }

  localStorage.setItem('listItem', JSON.stringify(contactList));

  allData();
  document.getElementById('form').reset();
}

function find(id) {
  var contactList = JSON.parse(localStorage.getItem('listItem')) || [];
  contactList.forEach(function (value) {
    if (value.id == id) {
      document.getElementById('id').value = value.id;
      document.getElementById('name').value = value.name;
      document.getElementById('age').value = value.age;
      document.getElementById('address').value = value.address;
      document.getElementById('phone').value = value.phone;
      document.getElementById('kategori').value = value.kategori;
      document.getElementById('jumlah').value = value.jumlah;
      document.getElementById('diskon').value = value.diskon;
      document.getElementById('harga').value = value.harga;
    }
  });
}

function removeData(id) {
  var contactList = JSON.parse(localStorage.getItem('listItem')) || [];
  contactList = contactList.filter((value) => value.id != id);
  localStorage.setItem('listItem', JSON.stringify(contactList));
  allData();
}

// Mengatur waktu tampil dan hilangnya splash screen
window.onload = function () {
  setTimeout(function () {
    var splashScreen = document.getElementById('splash-screen');
    splashScreen.style.animation = 'fadeOut 1s'; // Menambahkan animasi fade out
    splashScreen.style.animationFillMode = 'forwards'; // Membuat elemen tetap pada frame akhir animasi
  }, 3000); // Waktu ditampilkan dalam milidetik, jadi 3000 = 3 detik
};
