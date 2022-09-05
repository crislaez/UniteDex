export interface Stat {
  "name": string;
  "level": StatLevel[];
}

export interface StatLevel {
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

