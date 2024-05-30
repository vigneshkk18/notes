export interface Chip {
  id: string;
  text: string;
}

export interface Chips {
  used: Chip[];
  unused: Chip[];
}

export interface ChipsState {
  chips: Chips;
  selected: string;
}
