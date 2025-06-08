const textarea = document.getElementById("mapEditor");
const preview = document.getElementById("preview");
const template = "{time: , x: },";

textarea.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        const newValue = value.substring(0, start) + "\n" + template + value.substring(end);
        textarea.value = newValue;
        textarea.setSelectionRange(start + template.length + 1, start + template.length + 1);
    }
});

function addRow() {
    const value = textarea.value;
    const hasNewline = value.length > 0 && !value.endsWith("\n");
    textarea.value += (hasNewline ? "\n" : "") + template;
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
}

function save() {
    const text = textarea.value.trim();
    try {
        const lines = text.split("\n").filter(line => line.trim() !== "");
        const jsonArray = lines.map(line => {
            let jsonLine = line.trim().replace(/(\w+):/g, '"$1":');
            if (jsonLine.endsWith(",")) {
                jsonLine = jsonLine.slice(0, -1);
            }
            return JSON.parse(jsonLine);
        });
        const jsonString = JSON.stringify(jsonArray, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "map.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        alert("Hiba: A textarea tartalma nem alakítható érvényes JSON formátumra!");
        console.error(error);
    }
}
