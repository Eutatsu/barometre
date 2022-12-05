import pandas as pd
import gspread

# Base de dades global
DB_GOOGLE_URL = 'https://docs.google.com/spreadsheets/d/105YLYfRNPUvhx6G8QUkZykGPHPTpzCk6WO5zBGV2LcA/edit#gid=374549152'
gc = gspread.service_account(filename='./crawlers/arreplegats_keys.json')
wks = gc.open_by_url(DB_GOOGLE_URL).worksheet("AZUs")

# Base de dades d'Arreplegats
CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzvM_JNeX_MUNi4ZarVZDcj5CdyrDBTPbf3lDUrvUs_HvaX3S0k07yLmJKolAPf0BA6iM1FW4w1u83/pub?gid=0&single=true&output=csv"
dd_azus = pd.read_csv(CSV_URL, dtype=str, na_filter=False)

def pre_castell(row):
    tipus = row['tipus']
    if tipus.lower() == 'p': tipus = 'P'
    if tipus.lower() == 't': tipus = '2'
    return f"{tipus}d{row['alçada']}{row['pinya']}"

def sf(row):
    castells_sense_folre = ['4d8', 'Td7', 'pd6']
    return pre_castell(row) in castells_sense_folre

# DATA
dd_azus["DATA"] = dd_azus.apply(lambda row:
    f"{int(row['dia'])}/{int(row['mes'])}/{int(row['any'])}",
axis = 1)

# DIADA
dd_azus["DIADA"] = dd_azus.apply(lambda row:
    str(row['motiu']).strip(),
axis = 1)

# LLOC
dd_azus["LLOC"] = dd_azus.apply(lambda row:
    f"{str(row['situació']).strip()}, {str(row['ciutat']).strip()}",
axis = 1)

# RONDA
dd_azus["RONDA"] = dd_azus.apply(lambda row:
    int(row['ordre']) if row['ordre'] != ''
    else '-',
axis = 1)

# CASTELL
dd_azus["CASTELL"] = dd_azus.apply(lambda row:
    str(pre_castell(row))
    + str('sf' if sf(row) else '')
    + str('a' if row['agulla'] != '' else '')
    + str('s' if row['altres'] == 'ps' else '')
    + str('cam' if row['altres'] == 'cam' else ''),
axis = 1)

# RESULTAT
dd_azus["RESULTAT"] = dd_azus.apply(lambda row:
    "Descarregat" if row['resolució'] == '' else
    ("Carregat" if row['resolució'] == 'c' else
    ("Intent desmuntat" if row['resolució'] == 'id' else
    ("Intent" if row['resolució'] == 'i' else
    "Altre"))),
axis = 1)

# COLLA
dd_azus["COLLA"] = dd_azus.apply(lambda row:
    "Arreplegats",
axis = 1)

nova_bbdd = dd_azus[["DATA", "DIADA", "LLOC", "RONDA", "CASTELL", "RESULTAT", "COLLA"]]
wks.update([nova_bbdd.columns.values.tolist()] + nova_bbdd.values.tolist())