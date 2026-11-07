// =====================================
// DATA MAHASISWA PGSD A1 PAGI
// =====================================

const initialStudents = [
    { npm: "2602090001", name: "QIARA SAFA ANNISA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090002", name: "AUDY AURA CLAUDIA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090003", name: "ELVINA ANANDITA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090004", name: "SOPIA MUFIDAH", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090005", name: "RAUDATUL JANNAH BR.DAMANIK", individu: 70, kelompok: "", uts: "", uas: "" },
    { npm: "2602090006", name: "SHERA TRI NINDA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090007", name: "ALYA FATMA GINTING", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090008", name: "DESWITA PUTRI SAGALA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "26020900009", name: "WARDATUL FITHRIYAH", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090010", name: "ALIFIA AMANDA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090011", name: "ALLIYAH RAHMAH", individu: "", kelompok: 85, uts: "", uas: "" },
    { npm: "2602090012", name: "NADIRA AYLA AYUNDA", individu: 70, kelompok: "", uts: "", uas: "" },
    { npm: "2602090013", name: "LIDYA SHOBAHA HARAHAP", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090014", name: "RICKA VINNY RAHAYA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090015", name: "DINDA MARSYA SINAGA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090016", name: "TENGKU KEYZIA FACHIRA", individu: 70, kelompok: "", uts: "", uas: "" },
    { npm: "2602090017", name: "DINI AMALIA", individu: 70, kelompok: "", uts: "", uas: "" },
    { npm: "2602090018", name: "ARISA AYUNI", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090019", name: "NAZWA ALMAGFIROH", individu: 70, kelompok: "", uts: "", uas: "" },
    { npm: "2602090020", name: "NIKITA CLARA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090021", name: "SINTIA SULIS ALZAHRA", individu: 70, kelompok: "", uts: "", uas: "" },
    { npm: "2602090022", name: "SOFIA ULAYA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090023", name: "SENA AULIA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090024", name: "AISYAH AYUNDA PUTRI SYALNA.SR", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090025", name: "KHAIRUNNISA BRILIAN", individu: "", kelompok: 85, uts: "", uas: "" },
    { npm: "2602090027", name: "MUTHIA ANASTASYA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090028", name: "NABILA AZZAHRA DAULAY", individu: 70, kelompok: "", uts: "", uas: "" },
    { npm: "2602090029", name: "AFIFAH IZZATUL HAYA", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090030", name: "INDAH", individu: 100, kelompok: "", uts: "", uas: "" },
    { npm: "2602090031", name: "RINDI KHAIRALI ANGKAT", individu: 70, kelompok: "", uts: "", uas: "" },
    { npm: "2602090032", name: "MEDI", individu: 70, kelompok: "", uts: "", uas: "" },
    { npm: "2602090198", name: "MUZNA KAMAL SARAGIH", individu: 70, kelompok: "", uts: "", uas: "" }
];


// =====================================
// PENGATURAN PENYIMPANAN DATA
// =====================================

const STORAGE_KEY = "pgsdA1PagiAbsensiData";

function createInitialData() {
    return {
        students: initialStudents.map(student => ({ ...student })),
        meetings: [
            {
                id: 1,
                name: "Pertemuan 1",
                attendance: {}
            }
        ],
        selectedMeetingId: 1
    };
}

function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return createInitialData();
    }

    try {
        const data = JSON.parse(saved);

        if (!Array.isArray(data.students) ||
            !Array.isArray(data.meetings) ||
            data.meetings.length === 0) {
            return createInitialData();
        }

        // Memastikan data mahasiswa tetap mengikuti daftar terbaru.
        const savedStudents = new Map(
            data.students.map(student => [String(student.npm), student])
        );

        const students = initialStudents.map(student => {
            const oldStudent = savedStudents.get(student.npm);

            return {
                ...student,
                ...(oldStudent || {}),
                npm: student.npm,
                name: student.name
            };
        });

        const meetings = data.meetings.map((meeting, index) => ({
            id: meeting.id ?? index + 1,
            name: meeting.name || `Pertemuan ${index + 1}`,
            attendance: meeting.attendance || {}
        }));

        const selectedMeetingId = meetings.some(
            meeting => meeting.id === data.selectedMeetingId
        )
            ? data.selectedMeetingId
            : meetings[0].id;

        return {
            students,
            meetings,
            selectedMeetingId
        };

    } catch (error) {
        console.error("Gagal membaca data:", error);
        return createInitialData();
    }
}

let appData = loadData();

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}


// =====================================
// MENGAMBIL ELEMEN HTML
// =====================================

const totalStudents = document.getElementById("totalStudents");
const totalMeetings = document.getElementById("totalMeetings");
const presentCount = document.getElementById("presentCount");

const meetingSelect = document.getElementById("meetingSelect");

const attendanceBody = document.getElementById("attendanceBody");
const gradesBody = document.getElementById("gradesBody");
const recapBody = document.getElementById("recapBody");

const attendanceSearch = document.getElementById("attendanceSearch");
const gradeSearch = document.getElementById("gradeSearch");

const addMeetingBtn = document.getElementById("addMeetingBtn");
const deleteMeetingBtn = document.getElementById("deleteMeetingBtn");

const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");

const toast = document.getElementById("toast");


// =====================================
// FUNGSI BANTUAN
// =====================================

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function getSelectedMeeting() {
    return appData.meetings.find(
        meeting => meeting.id === appData.selectedMeetingId
    );
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[char];
    });
}

function getFilteredStudents(searchValue) {
    const keyword = searchValue.trim().toLowerCase();

    return appData.students.filter(student => {
        return (
            student.name.toLowerCase().includes(keyword) ||
            student.npm.toLowerCase().includes(keyword)
        );
    });
}


// =====================================
// STATISTIK
// =====================================

function renderStats() {
    const meeting = getSelectedMeeting();

    totalStudents.textContent = appData.students.length;
    totalMeetings.textContent = appData.meetings.length;

    const hadir = appData.students.filter(student => {
        return meeting?.attendance[student.npm] === "Hadir";
    }).length;

    presentCount.textContent = hadir;
}


// =====================================
// PILIH PERTEMUAN
// =====================================

function renderMeetingSelect() {
    meetingSelect.innerHTML = "";

    appData.meetings.forEach(meeting => {
        const option = document.createElement("option");

        option.value = meeting.id;
        option.textContent = meeting.name;

        if (meeting.id === appData.selectedMeetingId) {
            option.selected = true;
        }

        meetingSelect.appendChild(option);
    });
}


// =====================================
// TABEL ABSENSI
// =====================================

function renderAttendance() {
    const meeting = getSelectedMeeting();

    if (!meeting) {
        attendanceBody.innerHTML = "";
        return;
    }

    const students = getFilteredStudents(attendanceSearch.value);

    attendanceBody.innerHTML = students.map((student, index) => {
        const status = meeting.attendance[student.npm] || "";

        return `
            <tr>
                <td>${index + 1}</td>
                <td>${escapeHTML(student.npm)}</td>
                <td>${escapeHTML(student.name)}</td>
                <td>
                    <select
                        class="status-select attendance-select"
                        data-npm="${escapeHTML(student.npm)}"
                    >
                        <option value="" ${status === "" ? "selected" : ""}>
                            Pilih Status
                        </option>

                        <option value="Hadir" ${status === "Hadir" ? "selected" : ""}>
                            Hadir
                        </option>

                        <option value="Izin" ${status === "Izin" ? "selected" : ""}>
                            Izin
                        </option>

                        <option value="Sakit" ${status === "Sakit" ? "selected" : ""}>
                            Sakit
                        </option>

                        <option value="Alpa" ${status === "Alpa" ? "selected" : ""}>
                            Alpa
                        </option>
                    </select>
                </td>
            </tr>
        `;
    }).join("");

    document.querySelectorAll(".attendance-select").forEach(select => {
        select.addEventListener("change", function () {
            const npm = this.dataset.npm;
            const value = this.value;

            if (value === "") {
                delete meeting.attendance[npm];
            } else {
                meeting.attendance[npm] = value;
            }

            saveData();
            renderStats();
            renderRecap();
        });
    });
}


// =====================================
// TABEL NILAI
// =====================================

function renderGrades() {
    const students = getFilteredStudents(gradeSearch.value);

    gradesBody.innerHTML = students.map((student, index) => {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${escapeHTML(student.npm)}</td>
                <td>${escapeHTML(student.name)}</td>

                <td>
                    <input
                        type="number"
                        class="grade-input"
                        data-npm="${escapeHTML(student.npm)}"
                        data-field="individu"
                        min="0"
                        max="100"
                        value="${escapeHTML(student.individu)}"
                        placeholder="-"
                    >
                </td>

                <td>
                    <input
                        type="number"
                        class="grade-input"
                        data-npm="${escapeHTML(student.npm)}"
                        data-field="kelompok"
                        min="0"
                        max="100"
                        value="${escapeHTML(student.kelompok)}"
                        placeholder="-"
                    >
                </td>

                <td>
                    <input
                        type="number"
                        class="grade-input"
                        data-npm="${escapeHTML(student.npm)}"
                        data-field="uts"
                        min="0"
                        max="100"
                        value="${escapeHTML(student.uts)}"
                        placeholder="-"
                    >
                </td>

                <td>
                    <input
                        type="number"
                        class="grade-input"
                        data-npm="${escapeHTML(student.npm)}"
                        data-field="uas"
                        min="0"
                        max="100"
                        value="${escapeHTML(student.uas)}"
                        placeholder="-"
                    >
                </td>
            </tr>
        `;
    }).join("");

    document.querySelectorAll(".grade-input").forEach(input => {
        input.addEventListener("change", function () {
            const npm = this.dataset.npm;
            const field = this.dataset.field;
            const student = appData.students.find(
                item => item.npm === npm
            );

            if (!student) return;

            if (this.value === "") {
                student[field] = "";
            } else {
                const value = Number(this.value);

                if (!Number.isFinite(value) || value < 0 || value > 100) {
                    showToast("Nilai harus antara 0 sampai 100.");
                    this.value = student[field];
                    return;
                }

                student[field] = value;
            }

            saveData();
            showToast("Nilai berhasil disimpan.");
        });
    });
}


// =====================================
// TABEL REKAP KEHADIRAN
// =====================================

function renderRecap() {
    recapBody.innerHTML = appData.students.map((student, index) => {
        let hadir = 0;
        let izin = 0;
        let sakit = 0;
        let alpa = 0;

        appData.meetings.forEach(meeting => {
            const status = meeting.attendance[student.npm];

            if (status === "Hadir") hadir++;
            if (status === "Izin") izin++;
            if (status === "Sakit") sakit++;
            if (status === "Alpa") alpa++;
        });

        const totalPertemuan = appData.meetings.length;

        const persentase = totalPertemuan > 0
            ? Math.round((hadir / totalPertemuan) * 100)
            : 0;

        return `
            <tr>
                <td>${index + 1}</td>
                <td>${escapeHTML(student.npm)}</td>
                <td>${escapeHTML(student.name)}</td>
                <td>${hadir}</td>
                <td>${izin}</td>
                <td>${sakit}</td>
                <td>${alpa}</td>
                <td><strong>${persentase}%</strong></td>
            </tr>
        `;
    }).join("");
}


// =====================================
// NAVIGASI HALAMAN
// =====================================

const navButtons = document.querySelectorAll(".nav-btn");

const views = [
    "attendanceView",
    "gradesView",
    "recapView"
];

navButtons.forEach(button => {
    button.addEventListener("click", function () {
        const targetId = this.dataset.view;

        views.forEach(viewId => {
            document.getElementById(viewId).classList.add("hidden");
        });

        document.getElementById(targetId).classList.remove("hidden");

        navButtons.forEach(nav => {
            nav.classList.remove("active");
        });

        this.classList.add("active");
    });
});


// =====================================
// GANTI PERTEMUAN
// =====================================

meetingSelect.addEventListener("change", function () {
    appData.selectedMeetingId = Number(this.value);

    saveData();
    renderAll();
});


// =====================================
// TAMBAH PERTEMUAN
// =====================================

addMeetingBtn.addEventListener("click", function () {
    const nomor = appData.meetings.length + 1;

    const namaPertemuan = prompt(
        "Masukkan nama pertemuan:",
        `Pertemuan ${nomor}`
    );

    if (namaPertemuan === null) return;

    if (namaPertemuan.trim() === "") {
        showToast("Nama pertemuan tidak boleh kosong.");
        return;
    }

    const newId = Date.now();

    appData.meetings.push({
        id: newId,
        name: namaPertemuan.trim(),
        attendance: {}
    });

    appData.selectedMeetingId = newId;

    saveData();
    renderAll();

    showToast("Pertemuan berhasil ditambahkan.");
});


// =====================================
// HAPUS PERTEMUAN
// =====================================

deleteMeetingBtn.addEventListener("click", function () {
    if (appData.meetings.length <= 1) {
        showToast("Minimal harus ada satu pertemuan.");
        return;
    }

    const meeting = getSelectedMeeting();

    const yakin = confirm(
        `Apakah kamu yakin ingin menghapus ${meeting.name}?`
    );

    if (!yakin) return;

    appData.meetings = appData.meetings.filter(
        item => item.id !== appData.selectedMeetingId
    );

    appData.selectedMeetingId = appData.meetings[0].id;

    saveData();
    renderAll();

    showToast("Pertemuan berhasil dihapus.");
});


// =====================================
// PENCARIAN MAHASISWA
// =====================================

attendanceSearch.addEventListener("input", renderAttendance);

gradeSearch.addEventListener("input", renderGrades);


// =====================================
// EKSPOR DATA JSON
// =====================================

exportBtn.addEventListener("click", function () {
    const dataJSON = JSON.stringify(appData, null, 4);

    const blob = new Blob([dataJSON], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "Absensi_PGSD_A1_PAGI.json";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showToast("Data berhasil diekspor.");
});


// =====================================
// IMPOR DATA JSON
// =====================================

importFile.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const importedData = JSON.parse(e.target.result);

            if (
                !Array.isArray(importedData.students) ||
                !Array.isArray(importedData.meetings) ||
                importedData.meetings.length === 0
            ) {
                throw new Error("Format data tidak sesuai.");
            }

            const studentMap = new Map(
                importedData.students.map(student => [
                    String(student.npm),
                    student
                ])
            );

            // Nama mahasiswa mengikuti daftar terbaru.
            const importedStudents = initialStudents.map(student => {
                const oldStudent = studentMap.get(student.npm);

                return {
                    ...student,
                    ...(oldStudent || {}),
                    npm: student.npm,
                    name: student.name
                };
            });

            const importedMeetings = importedData.meetings.map(
                (meeting, index) => ({
                    id: meeting.id ?? index + 1,
                    name: meeting.name || `Pertemuan ${index + 1}`,
                    attendance: meeting.attendance || {}
                })
            );

            const selectedId = importedMeetings.some(
                meeting => meeting.id === importedData.selectedMeetingId
            )
                ? importedData.selectedMeetingId
                : importedMeetings[0].id;

            appData = {
                students: importedStudents,
                meetings: importedMeetings,
                selectedMeetingId: selectedId
            };

            saveData();
            renderAll();

            showToast("Data berhasil diimpor.");

        } catch (error) {
            console.error(error);
            showToast("File tidak valid atau gagal dibaca.");
        }

        importFile.value = "";
    };

    reader.readAsText(file);
});


// =====================================
// MENAMPILKAN SEMUA DATA
// =====================================

function renderAll() {
    renderMeetingSelect();
    renderStats();
    renderAttendance();
    renderGrades();
    renderRecap();
}


// =====================================
// JALANKAN WEBSITE
// =====================================

saveData();
renderAll();