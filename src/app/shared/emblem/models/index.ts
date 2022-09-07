export interface Emblem {
  "name": string;
  "pokedex": string;
  "grade": string;
  "display_name": string;
  "color1": string;
  "color2": string;
  "stats": StatEmblem[]
}

export interface EmblemColor {
  "name": string;
  "color": string;
  "count1": number;
  "count2": number;
  "count3": number;
  "bonus1": number;
  "bonus2": number;
  "bonus3": number;
  "percent": boolean
  "math": string;
  "stat": string;
  "stat_desc": string;
}

export interface StatEmblem {
  "attack":number;
  "attack_speed":number;
  "cdr":number;
  "crit":number;
  "defense":number;
  "hp":number;
  "level":number;
  "lifesteal":number;
  "sp_attack":number;
  "sp_defense":number;
}

export interface EmblemFilter {
  "name"?:string;
  "color"?:string;
}

