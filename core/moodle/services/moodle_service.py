import requests
from django.conf import settings
from bs4 import BeautifulSoup
from django.http import JsonResponse

def parse_participants(html):
    soup = BeautifulSoup(html, "html.parser")
    rows = soup.select("#participants tbody tr")

    data = []

    for i, row in enumerate(rows):
        cols = row.find_all("td")

        data.append({
            "correlativo": i + 1,
            "id": cols[1].text.strip() if len(cols) > 1 else "",
            "nombre": cols[2].text.strip() if len(cols) > 2 else "",
            "email": cols[3].text.strip() if len(cols) > 3 else "",
            "rol": cols[4].text.strip() if len(cols) > 4 else "",
            "grupo": cols[5].text.strip() if len(cols) > 5 else "",
            "ultimoAcceso": cols[6].text.strip() if len(cols) > 6 else "",
            "estado": cols[7].text.strip() if len(cols) > 7 else "",
        })

    return data

def get_participants(request, course_id):

    base_url = request.headers.get("X-Moodle-BaseUrl")
    sesskey = request.headers.get("X-Moodle-Sesskey")
    cookie = request.headers.get("X-Moodle-Cookie")

    if not base_url:
        base_url = settings.MOODLE_BASE_URL
    if not sesskey:
        sesskey = settings.MOODLE_SESSKEY
    if not cookie:
        cookie = settings.MOODLE_COOKIE

    if not base_url or not sesskey or not cookie:
        return {
            "success": False,
            "message": "Faltan credenciales de Moodle"
        }

    url = f"{base_url}/lib/ajax/service.php"

    params = {
        "sesskey": sesskey,
        "info": "core_table_get_dynamic_table_content"
    }

    payload = [
        {
            "index": 0,
            "methodname": "core_table_get_dynamic_table_content",
            "args": {
                "component": "core_user",
                "handler": "participants",
                "uniqueid": f"user-index-participants-{course_id}",
                "sortdata": [
                    {
                        "sortby": "lastname",
                        "sortorder": 4
                    }
                ],
                "jointype": 2,
                "filters": {
                    "courseid": {
                        "name": "courseid",
                        "jointype": 1,
                        "values": [course_id]
                    }
                },
                "firstinitial": "",
                "lastinitial": "",
                "pagenumber": 0,     
                "pagesize": 5000,    
                "hiddencolumns": [],
                "resetpreferences": False
            }
        }
    ]

    headers = {
        "Content-Type": "application/json",
        "Cookie": cookie
    }

    

    try:
        print("========== REQUEST A MOODLE ==========")
        print("URL:", url)
        print("PARAMS:", params)
        print("HEADERS:", headers)
        print("PAYLOAD:", payload)
        print("======================================")

        response = requests.post(
            url,
            params=params,
            headers=headers,
            json=payload
        )

        print("========== RESPONSE DE MOODLE ==========")
        print("STATUS:", response.status_code)
        print("TEXT:", response.text)
        print("========================================")


        data = response.json()

        print("MOODLE RESPONSE:", data)

        return data

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }

#OBTENER LOS CURSOS POR CICLO
def get_courses_by_category(request, category_id):

    # 🔹 HEADERS DESDE FRONT
    base_url = request.headers.get("X-Moodle-BaseUrl")
    cookie = request.headers.get("X-Moodle-Cookie")

    # 🔥 VALIDACIÓN
    if not base_url or not cookie:
        return {
            "success": False,
            "message": "Faltan credenciales de Moodle"
        }

    url = f"{base_url}/course/management.php?categoryid={category_id}&perpage=999"

    session = requests.Session()

    headers = {
        "Cookie": cookie,
        "User-Agent": "Mozilla/5.0"
    }

    try:
        response = session.get(url, headers=headers)

        soup = BeautifulSoup(response.text, "html.parser")

        courses = []

        items = soup.select("li.listitem-course")

        for item in items:
            course_id = item.get("data-id")

            name_tag = item.select_one(".coursename")
            name = name_tag.text.strip() if name_tag else ""

            code_tag = item.select_one(".idnumber")
            code = code_tag.text.strip() if code_tag else ""

            # 🔥 EXTRAER SECCION Y CICLO
            seccion_curso = ""
            ciclo = ""

            if " - " in name:
                try:
                    seccion_curso = name.split(" - ")[1].strip()

                    if ">" in seccion_curso:
                        ciclo = seccion_curso.split(">")[1][:2]

                except Exception:
                    pass

            courses.append({
                "id": course_id,
                "nombre": name,
                "codigo": code,
                "seccion_curso": seccion_curso,
                "ciclo": ciclo
            })

        return courses

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }


#OBTENER LAS CATEGORIAS Y PROGRAMAS(CURSOS)
# def parse_category_tree(soup, parent_ul, parent_id=None):
#     categorias = []

#     items = parent_ul.find_all("li", class_="listitem-category", recursive=False)

#     for item in items:
#         link = item.select_one("a.categoryname")
#         if not link:
#             continue

#         nombre = link.text.strip()
#         href = link.get("href")

#         if "categoryid=" not in href:
#             continue

#         category_id = int(href.split("categoryid=")[-1])
#         is_expandable = item.get("data-expandable") == "1"

#         categoria = {
#             "id": category_id,
#             "nombre": nombre,
#             "parent_id": parent_id,
#             "is_expandable": is_expandable,
#             "children": []
#         }

#         sub_ul = item.find("ul", recursive=False)

#         if sub_ul:
#             categoria["children"] = parse_category_tree(
#                 soup,
#                 sub_ul,
#                 category_id
#             )

#         categorias.append(categoria)

#     return categorias


# def parse_category_tree(parent_ul, parent_id=None):
#     categorias = []

#     items = parent_ul.find_all("li", class_="listitem-category", recursive=False)

#     for item in items:
#         # 🔥 ignorar deshabilitados
#         if item.get("data-visible") != "1":
#             continue

#         link = item.select_one("a.categoryname")
#         if not link:
#             continue

#         nombre = link.text.strip()
#         href = link.get("href")

#         if "categoryid=" not in href:
#             continue

#         category_id = int(href.split("categoryid=")[-1])

#         categoria = {
#             "id": category_id,
#             "nombre": nombre,
#             "parent_id": parent_id,
#             "children": []
#         }

#         sub_ul = item.find("ul", recursive=False)

#         if sub_ul:
#             categoria["children"] = parse_category_tree(sub_ul, category_id)

#         categorias.append(categoria)

#     return categorias

# def parse_category(li):
#     a = li.find("a")
#     if not a:
#         return None

#     name = a.get_text(strip=True)

#     # obtener ID del href
#     href = a.get("href", "")
#     category_id = None
#     if "categoryid=" in href:
#         category_id = href.split("categoryid=")[-1]

#     node = {
#         "id": category_id,
#         "name": name,
#         "children": []
#     }

#     # buscar hijos
#     sub_ul = li.find("ul")
#     if sub_ul:
#         sub_lis = sub_ul.find_all("li", recursive=False)
#         for sub_li in sub_lis:
#             child = parse_category(sub_li)
#             if child:
#                 node["children"].append(child)

#     return node


# def parse_tree(html):
#     soup = BeautifulSoup(html, "html.parser")

#     root_ul = soup.find("ul", {"role": "tree"}) or \
#               soup.find("ul", class_="list-subcategories")

#     if not root_ul:
#         return []

#     return [parse_category(li) for li in root_ul.find_all("li", recursive=False)]


# OBTENER ÁRBOL COMPLETO
# -----------------------------
# def get_full_category_tree():
#     url = f"{settings.MOODLE_BASE_URL}/course/management.php"

#     headers = {
#         "Cookie": settings.MOODLE_COOKIE,
#         "User-Agent": "Mozilla/5.0"
#     }

#     response = requests.get(url, headers=headers)

#     return parse_tree(response.text)


# -----------------------------
# HELPERS
# -----------------------------
# def is_ciclo(nombre):
#     return "CICLO" in nombre.upper()


# -----------------------------
# EXTRAER PROGRAMAS + CICLOS
# -----------------------------
# def extract_programas_con_ciclos(nodos, current_program=None, result=None):
#     if result is None:
#         result = {}

#     for nodo in nodos:
#         nombre = nodo["nombre"]
#         hijos = nodo.get("children", [])

#         if is_ciclo(nombre):
#             if current_program not in result:
#                 result[current_program] = {
#                     "programa": current_program,
#                     "ciclos": []
#                 }

#             result[current_program]["ciclos"].append({
#                 "id": nodo["id"],
#                 "nombre": nombre
#             })

#         else:
#             nuevo_programa = current_program or nombre
#             extract_programas_con_ciclos(hijos, nuevo_programa, result)

#     return list(result.values())


# -----------------------------
# SERVICE FINAL
# -----------------------------
# def get_programas_con_ciclos():
#     tree = get_full_category_tree()

#     # 🔥 buscar PREGRADO
#     pregrado = next(
#         (c for c in tree["children"] if c["nombre"].upper() == "PREGRADO"),
#         None
#     )

#     if not pregrado:
#         return []

#     return extract_programas_con_ciclos(pregrado["children"])