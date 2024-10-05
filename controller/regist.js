function validateRegist() {
  const nama = document.getElementById('nama').value;
  const alamat = document.getElementById('alamat').value;
  const gender = document.getElementById('gender').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  let errorMessage = '';

  if (!nama || !alamat || !gender || !username || !password) {
    // Validasi nama
    if (!nama) {
      errorMessage += 'Nama harus diisi.\n';
    }
    // Validasi alamat
    if (!alamat) {
      errorMessage += 'Alamat harus diisi.\n';
    }
    // Validasi gender
    if (!gender) {
      errorMessage += 'Gender harus diisi.\n';
    }
    // Validasi username/email
    if (!username) {
      errorMessage += 'Username/Email harus diisi.\n';
    }
    // Validasi password
    if (!password) {
      errorMessage += 'Password harus diisi.\n';
    }
    
    if (errorMessage) {
      alert(errorMessage);
      return false;
    }
  } else {
    alert('Registrasi Berhasil Tapi Fitur Belum Tersedia');
    window.location.href = '../menu/login.html';
  }
}
