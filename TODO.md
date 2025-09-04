# TODO: Perbaikan Tombol Edit dan Delete di Admin Dedications dan Members

## Langkah Perbaikan

### 1. Perbaiki Halaman Dedications (src/app/admin/dedications/page.tsx)
- [ ] Tambahkan console.log di fungsi handleEdit untuk memastikan tombol edit terpanggil
- [ ] Pastikan state editing di-set dengan benar saat tombol edit diklik
- [ ] Pastikan form terisi dengan data yang benar saat editing
- [ ] Tambahkan error handling yang lebih baik untuk fetch PUT

### 2. Perbaiki Halaman Members (src/app/admin/members/page.tsx)
- [ ] Tambahkan console.log di fungsi handleEdit dan handleDelete untuk debugging
- [ ] Pastikan request PUT dan DELETE mengirim data dengan format yang benar
- [ ] Pastikan fetchMembers dipanggil setelah operasi untuk refresh data
- [ ] Tambahkan error handling untuk fetch request

### 3. Perbaiki API Route Members (src/app/api/members/route.ts)
- [ ] Tambahkan log error untuk debugging jika ada masalah di API
- [ ] Pastikan PUT dan DELETE menangani data dengan benar

### 4. Testing
- [ ] Test tombol edit di dedications
- [ ] Test tombol delete di dedications
- [ ] Test tombol edit di members
- [ ] Test tombol delete di members
