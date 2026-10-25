import fitz, os

sections = [
    ("01_osnovy.md", "ОСНОВЫ", 5, 64),
    ("02_personazhi.md", "ПЕРСОНАЖИ", 65, 106),
    ("03_komanda.md", "КОМАНДА", 107, 142),
    ("04_delo.md", "ДЕЛО", 143, 166),
    ("05_peredyshka.md", "ПЕРЕДЫШКА", 167, 184),
    ("06_kak_igrat.md", "КАК ИГРАТЬ", 185, 224),
    ("07_kak_vesti_igru.md", "КАК ВЕСТИ ИГРУ", 225, 250),
    ("08_misticheskie_sily.md", "МИСТИЧЕСКИЕ СИЛЫ", 251, 274),
    ("09_izmeneniya_v_igre.md", "ИЗМЕНЕНИЯ В ИГРЕ", 275, 284),
    ("10_putevoditel_po_daskvolu.md", "ПУТЕВОДИТЕЛЬ ПО ДАСКВОЛУ", 285, 367),
    ("11_raskolotye_ostrova.md", "РАСКОЛОТЫЕ ОСТРОВА", 368, 369),
    ("12_alfavitnyj_ukazatel.md", "АЛФАВИТНЫЙ УКАЗАТЕЛЬ", 370, 384),
]

os.makedirs("docs/rules", exist_ok=True)
doc = fitz.open("Klinki_vo_tme.pdf")

for fname, title, start, end in sections:
    lines = [f"# {title}\n"]
    for bp in range(start, end + 1):
        pdf_index = bp + 4  # book page -> pdf index
        if pdf_index >= doc.page_count:
            break
        page = doc[pdf_index]
        text = page.get_text()
        lines.append(f"\n## Страница {bp}\n")
        lines.append(text)
    content = "\n".join(lines)
    with open(os.path.join("docs/rules", fname), "w", encoding="utf-8") as f:
        f.write(content)
    print("written", fname, start, end)

print("done")