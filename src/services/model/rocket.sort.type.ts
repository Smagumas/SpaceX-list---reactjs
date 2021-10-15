export type RocketSortTypes = RocketBasicSortTypes | RocketLengthSortTypes | RocketMassSortTypes;
export type RocketBasicSortTypes = 'cost_per_launch' | 'rocket_name';
export type RocketLengthSortTypes = 'height' | 'diameter';
export type RocketMassSortTypes = 'mass';