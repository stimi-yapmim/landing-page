# Analisis Desain Web Cyan University

## Ringkasan
Halaman **Cyan University** adalah template website universitas dengan fokus promosi institusi, program studi, penerimaan mahasiswa, event, berita, dan testimonial.[cite:1] Secara struktur, halaman ini sudah lengkap untuk kebutuhan marketing kampus, tetapi masih terlihat seperti template generik dan belum memiliki identitas visual yang kuat.[cite:1]

## Kekuatan Utama
- Struktur konten cukup lengkap: hero, notice, program, about, professors, form admission, alasan memilih kampus, event, tuition fee, testimonial, blog, dan footer.[cite:1]
- Navigasi utama mencakup area penting seperti Home, Pages, Academics, Admission, Blog, dan Contact, sehingga arsitektur informasinya mudah dipahami.[cite:1]
- CTA utama seperti **Discover Our Programs**, **Admission Open**, dan **View More Event** sudah tersebar di beberapa section untuk mendorong interaksi pengguna.[cite:1]
- Ada elemen kredibilitas seperti award, daftar professor, event, testimonial, serta informasi biaya kuliah yang membantu proses keputusan calon mahasiswa.[cite:1]

## Masalah Desain
### 1. Identitas visual belum kuat
Brand masih terasa generik karena nama, copy, gambar, dan komponen tampak seperti aset template yang belum dikustomisasi penuh.[cite:1] Ini membuat pengalaman visual kurang membedakan kampus dari website institusi lain.[cite:1]

### 2. Hirarki tipografi kurang rapi
Beberapa judul section pada ekstraksi konten tampil terpecah per huruf seperti “Academics & Programs”, “Experience the Different”, dan “Why Choose Univet”, yang mengindikasikan penggunaan efek heading dekoratif yang berisiko menurunkan keterbacaan.[cite:1] Bila efek ini juga muncul nyata di UI, maka fokus pengguna dapat terganggu terutama pada mobile.[cite:1]

### 3. CTA dan microcopy belum konsisten
Terdapat typo seperti “Dicover Our Programs” dan “Send Massage”, yang menurunkan persepsi kualitas produk digital.[cite:1] Repetisi label seperti “View Program” dan gaya CTA yang seragam juga membuat prioritas aksi belum cukup tegas.[cite:1]

### 4. Kepadatan halaman tinggi
Dalam satu halaman terdapat banyak blok konten besar: programs, about, professors, admission form, features, campus life, events, tuition, feedback, blog, dan gallery/footer.[cite:1] Tanpa ritme visual yang jelas, pengguna bisa merasa lelah sebelum mencapai section penting seperti pendaftaran atau kontak.[cite:1]

### 5. Kredibilitas konten belum sepenuhnya meyakinkan
Ada inkonsistensi data, misalnya bagian awal menyebut berdiri tahun 1966, sedangkan bagian about menyebut 1985.[cite:1] Selain itu, beberapa nama, lokasi, dan testimonial tampak placeholder, sehingga trust dapat menurun bila dipakai untuk website produksi.[cite:1]

## Analisis UX
### Alur pengguna
Alur utama tampaknya diarahkan dari hero ke program, lalu ke informasi kampus, kemudian ke admission form.[cite:1] Ini sudah sesuai funnel marketing pendidikan, tetapi form pendaftaran muncul cukup cepat tanpa pendahuluan manfaat atau bukti sosial yang lebih kuat tepat sebelumnya.[cite:1]

### Scanability
Section-section menggunakan pola card dan headline yang membantu scanning.[cite:1] Namun jumlah section yang banyak, konten yang repetitif, dan kemungkinan heading dekoratif membuat pemindaian cepat menjadi kurang efisien.[cite:1]

### Kepercayaan pengguna
Website sudah menyediakan notice, event, tuition fee, dan blog yang bagus untuk trust building.[cite:1] Meski begitu, placeholder content, typo, dan detail dummy perlu dibersihkan agar calon mahasiswa tidak ragu terhadap legitimasi institusi.[cite:1]

## Rekomendasi Desain
### Prioritas tinggi
1. Perkuat branding dengan logo yang lebih khas, palet warna kampus yang konsisten, dan tone copy yang lebih spesifik terhadap identitas institusi.[cite:1]
2. Rapikan semua microcopy dan typo, terutama pada CTA utama dan label form, agar kualitas terasa lebih profesional.[cite:1]
3. Sederhanakan hero section: satu headline kuat, satu supporting text singkat, dan maksimal dua CTA utama.[cite:1]
4. Validasi semua data penting seperti tahun berdiri, alamat, kontak, biaya, dan nama staf agar tidak ada kontradiksi.[cite:1]

### Prioritas menengah
1. Kurangi jumlah section pada homepage atau gabungkan beberapa blok agar halaman lebih fokus pada conversion utama.[cite:1]
2. Pindahkan admission form ke section yang lebih strategis setelah bukti sosial atau value proposition yang lebih kuat.[cite:1]
3. Buat variasi visual antar section dengan ritme layout yang berbeda, bukan hanya pengulangan card dan slider.[cite:1]
4. Pastikan heading dekoratif tidak mengorbankan readability di tablet dan mobile.[cite:1]

### Prioritas rendah
1. Tambahkan indikator status aktif pada navigasi agar orientasi pengguna lebih jelas.[cite:1]
2. Optimalkan testimonial supaya lebih autentik, misalnya dengan program studi, angkatan, atau outcome nyata.[cite:1]
3. Perjelas perbedaan antara informasi untuk calon mahasiswa, mahasiswa aktif, dan alumni melalui segmentasi konten.[cite:1]

## Arah Redesign yang Disarankan
Arah redesign yang cocok adalah **modern academic marketing site**: bersih, profesional, hangat, dan lebih editorial dibanding template-heavy.[cite:1] Gunakan hero yang lebih fokus, section program yang lebih ringkas, statistik kampus nyata, foto fasilitas asli, dan CTA apply yang konsisten dari atas hingga bawah halaman.[cite:1]

## Struktur Homepage yang Lebih Efektif
- Hero: headline kampus, subheadline, CTA Apply dan Explore Programs.[cite:1]
- Proof: statistik kampus, akreditasi, partner, ranking, award.[cite:1]
- Programs: kategori program unggulan dengan 3–6 kartu prioritas.[cite:1]
- Why Choose Us: value proposition yang singkat dan konkret.[cite:1]
- Student Life atau Campus Experience: foto/video asli dan narasi pengalaman.[cite:1]
- Testimonials/Outcomes: alumni success, employment, riset, prestasi.[cite:1]
- Admissions: langkah pendaftaran yang sederhana, bukan form panjang di tengah halaman.[cite:1]
- News & Events: konten dinamis untuk menunjukkan kampus aktif.[cite:1]
- Footer: kontak, tautan penting, newsletter, sosial media.[cite:1]

## Catatan Implementasi Frontend
Untuk implementasi ulang, desain ini akan lebih kuat bila memakai sistem desain yang konsisten: token warna, skala tipografi yang jelas, spacing 4px/8px, komponen card yang seragam, dan CTA hierarchy yang tegas.[cite:1] Pada level engineering, halaman ini juga cocok dipecah menjadi section reusable agar mudah diuji, dipelihara, dan diintegrasikan ke stack modern seperti React + Tailwind.[cite:1]
