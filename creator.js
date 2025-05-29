const textarea = document.getElementById("mapEditor");
const preview = document.getElementById("preview");
const template = "{time: , x: }";

// Enter lenyomásakor hozzáadjuk a sablont
textarea.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        // A szöveget két részre szedjük, és a sablont hozzáadjuk
        const newValue = value.substring(0, start) + "\n" + template + value.substring(end);

        // Frissítjük a textarea értékét
        textarea.value = newValue;

        // A kurzor automatikusan a sablon végére kerül, ha szükséges
        textarea.setSelectionRange(start + template.length + 1, start + template.length + 1);
    }
});

// Sor hozzáadása a textarea végéhez
function addRow() {
    const value = textarea.value;

    // Ha nincs új sor a végén, akkor hozzáadunk egyet
    const hasNewline = value.length > 0 && !value.endsWith("\n");
    textarea.value += (hasNewline ? "\n" : "") + template;

    // Fókuszálunk a textarea-ra és a kurzort a végére helyezzük
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

}

function save() {
    const text = textarea.value; // a textarea tartalma
    const blob = new Blob([text], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "map.txt"; // a fájl neve

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
