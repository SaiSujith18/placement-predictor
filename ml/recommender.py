import pandas as pd
from fuzzywuzzy import fuzz, process

# Load role-to-skills mapping once
role_skills = pd.read_csv(r"C:\Users\SAISUJITH\OneDrive\Desktop\placement-predictor\data\processed\role_to_skills1.csv")


def best_role_skills_match(user_skills, user_role, role_threshold=70, skills_threshold=70):
    user_skills_l = [s.lower() for s in user_skills]
    role_l = user_role.lower()

    all_roles = role_skills['Role'].str.lower().tolist()
    best_role, role_score = process.extractOne(role_l, all_roles, scorer=fuzz.token_set_ratio)

    if role_score < role_threshold:
        return "Role not found", {}, 0, []

    role_data = role_skills[role_skills['Role'].str.lower() == best_role].iloc[0]

    core = set([s.strip().lower() for s in role_data['core_skills'].split(',')])
    rare = set([s.strip().lower() for s in role_data['rare_imp_skills'].split(',')])
    normal = set([s.strip().lower() for s in role_data['Skills'].split(',')])

    matched = {'rare': [], 'core': [], 'normal': []}
    score = 0

    for skill in user_skills_l:
        best_rare_match, rare_score = process.extractOne(skill, rare, scorer=fuzz.token_set_ratio)
        if rare_score >= skills_threshold:
            matched['rare'].append(best_rare_match)
            score += 5
            continue

        best_core_match, core_score = process.extractOne(skill, core, scorer=fuzz.token_set_ratio)
        if core_score >= skills_threshold:
            matched['core'].append(best_core_match)
            score += 3
            continue

        best_normal_match, normal_score = process.extractOne(skill, normal, scorer=fuzz.token_set_ratio)
        if normal_score >= skills_threshold:
            matched['normal'].append(best_normal_match)
            score += 1

    recommended = []
    for s in rare - set(matched['rare']):
        recommended.append(s)
        if len(recommended) >= 5:
            break
    if len(recommended) < 5:
        for s in core - set(matched['core']):
            recommended.append(s)
            if len(recommended) >= 5:
                break
    if len(recommended) < 5:
        for s in normal - set(matched['normal']):
            recommended.append(s)
            if len(recommended) >= 5:
                break

    return best_role, matched, score, recommended
