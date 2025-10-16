# Instalação das dependências (somente no Jupyter/Colab)
# %pip install opencv-python numpy

import cv2
import numpy as np

# --- 1. Configuração ---
caminho_imagem = "assets/img/mapa.png"

# Lista de cidades, na mesma ordem dos contornos detectados
nomes_cidades = [
    "Biritiba Mirim", "Mogi das Cruzes", "Salesópolis", "Suzano",
    "Paraibuna", "Ribeirão Pires"
]

# --- 2. Carregamento da imagem ---
img = cv2.imread(caminho_imagem)
if img is None:
    raise FileNotFoundError(f"Não foi possível carregar a imagem: {caminho_imagem}")

img_copy = img.copy()  # Para desenhar contornos se necessário

# Converte para tons de cinza e binariza
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 180, 255, cv2.THRESH_BINARY_INV)

# Encontra contornos
contornos, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
contornos = sorted(contornos, key=lambda c: cv2.boundingRect(c)[0])  # esquerda -> direita

# --- 3. Geração do mapa interativo ---
map_html = f'<img src="{caminho_imagem}" usemap="#mapaInterativo" id="mapaImg" alt="Mapa Interativo">\n'
map_html += '<map name="mapaInterativo">\n'

for i, contorno in enumerate(contornos):
    if i >= len(nomes_cidades):
        break
    cidade = nomes_cidades[i]

    # Simplifica polígono
    perimetro = cv2.arcLength(contorno, True)
    epsilon = 0.005 * perimetro
    approx = cv2.approxPolyDP(contorno, epsilon, True)
    coords = approx.reshape(-1, 2).flatten().tolist()
    coords_str = ",".join(map(str, coords))

    map_html += (
        f'<area shape="poly" coords="{coords_str}" '
        f'data-cidade="{cidade}" href="/info/{cidade.lower().replace(" ", "-")}.html">\n'
    )

map_html += '</map>\n'

# --- 4. Geração do HTML completo ---
html_completo = f"""
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Mapa Interativo APRM ATC</title>
<style>
/* =========================== MUNICÍPIOS =========================== */
.municipios-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-items: center;
  padding: 20px 0;
}}
.municipios-section h2 {{
  color: #133b67;
}}
.municipios-grid h3 {{
  color: #fff;
  font-size: 1.2rem;
  margin: 0;
}}
.mun-card {{
  background-color: #133b67;
  border-radius: 12px;
  padding: 25px 15px;
  width: 100%;
  max-width: 250px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
}}
.mun-card:hover {{
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}}

/* =========================== MAPA =========================== */
#mapaImg {{
  max-width: 100%;
  height: auto;
}}
area {{
  outline: none;
}}
</style>
</head>
<body>

<h1>Municípios Participantes</h1>
<div class="municipios-grid">
{"".join([f'<article class="mun-card" data-cidade="{c}"><h3>{c}</h3></article>' for c in nomes_cidades])}
</div>

<section id="mapa">
  {map_html}
</section>

<script>
// Seleciona cards e áreas
const municipios = document.querySelectorAll('.mun-card');
const areas = document.querySelectorAll('area[data-cidade]');

// Destaca polígono ao passar o mouse no card
municipios.forEach(card => {{
    card.addEventListener('mouseenter', () => {{
        const cidade = card.dataset.cidade;
        areas.forEach(area => {{
            if(area.dataset.cidade === cidade){{
                area.style.outline = "3px solid red";
            }} else {{
                area.style.outline = "none";
            }}t
        }});
    }});
    card.addEventListener('mouseleave', () => {{
        areas.forEach(area => area.style.outline = "none");
    }});
}});
</script>

</body>
</html>
"""

# --- 5. Salva HTML ---
arquivo_saida = "mapa_interativo_com_cards.html"
with open(arquivo_saida, "w", encoding="utf-8") as f:
    f.write(html_completo)

print(f"HTML interativo gerado com sucesso: {arquivo_saida}")
