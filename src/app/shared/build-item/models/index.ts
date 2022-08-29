export interface BuildItem {
  "name": string;
  "display_name": string;
  "bonus1": string;
  "stats": Stats[];
  "description1": string;
  "tier": string;
  "tier_change": string;
  "description3": string;
  "level1": string;
  "level10": string;
  "level20": string;
}

export interface Filter {

}

export interface Stats {
  "label": string;
  "percent": boolean;
  "float": number;
  "initial": number;
  "start": number;
  "skip": number;
  "increment": number;
  "initial_diff": number;
}
