export interface Pokemon {
  'builds': Buil[];
  'damage_type': string;
  'display_name': string;
  'early_learn': string;
  'exclude_stats': boolean;
  'id': string;
  'name': string;
  'notes': string;
  'skills': Skill[]
  'soon': boolean;
  'tags': Tag
  'tier': string;
  'tier_change': string;
  'evolution':Evolution[];
}

export interface Filter {
  "name"?:string;
  "damageType"?:string;
  "range"?:string
  "difficulty"?:string
  "role"?:string
}

export interface Tag {
  "range":string;
  "difficulty": string;
  "role": string;
}

export interface Skill {
  "name": string;
  "passive2_name":string;
  "passive2_description":string;
  "ability": string;
  "description": string;
  "rsb": any
  "upgrades": any[]
}

export interface Evolution {
  "name":string;
  "level":string;
}

export interface Buil{
  'basic': string[];
  'battle_items': string[];
  'battle_items_optional': string;
  'held_items': string[];
  'held_items_optional': string;
  'lane': string;
  'name': string;
  'soon': string;
  'upgrade': string[];
}