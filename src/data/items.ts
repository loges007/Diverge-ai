import { ItemDefinition } from '../types/aut';

export const ITEM_BANK: ItemDefinition[] = [
  {
    id: 'coffee-cup',
    name: 'Coffee Mug',
    subtitle: 'Ceramic drinking mug with a handle',
    category: 'Kitchen & Dining',
    material: 'Ceramic porcelain',
    dimensions: '10cm × 8cm, ~300g',
    commonUses: [
      'drinking coffee',
      'holding tea',
      'drinking water',
      'holding pens',
      'pen holder',
      'mug cake',
      'pencil holder',
      'measuring scoop',
      'coin holder'
    ],
    keywords: ['cylinder', 'handle', 'ceramic', 'vessel', 'rim', 'scoop', 'bell', 'sound'],
    iconType: 'coffee',
    colorScheme: {
      primary: '#d97706',
      secondary: '#fef3c7',
      accent: '#92400e',
      bg: 'from-amber-50 to-orange-50'
    },
    promptHint: 'Think about its curved shape, hollow inside, solid ceramic weight, or acoustic chime.'
  },
  {
    id: 'paperclip',
    name: 'Paperclip',
    subtitle: 'Small bendable steel wire loop',
    category: 'Stationery & Office',
    material: 'Bendable steel wire',
    dimensions: '3cm length, ~1g',
    commonUses: [
      'holding papers',
      'clipping pages',
      'opening sim card tray',
      'picking a lock',
      'reset button poker',
      'bookmark',
      'money clip'
    ],
    keywords: ['wire', 'bendable', 'metal', 'spring', 'loop', 'hook', 'pin', 'needle'],
    iconType: 'paperclip',
    colorScheme: {
      primary: '#4f46e5',
      secondary: '#e0e7ff',
      accent: '#3730a3',
      bg: 'from-indigo-50 to-violet-50'
    },
    promptHint: 'You can unbend it into a long wire, hook things, conduct electricity, or make a mini tool.'
  },
  {
    id: 'brick',
    name: 'Brick',
    subtitle: 'Heavy rectangular clay block',
    category: 'Home & Construction',
    material: 'Baked clay',
    dimensions: '20cm × 10cm × 6cm, ~2kg',
    commonUses: [
      'building walls',
      'doorstop',
      'holding door open',
      'paperweight',
      'stepping stone',
      'garden edging',
      'heavy weight'
    ],
    keywords: ['heavy', 'rough', 'red clay', 'chalk', 'crush to powder', 'heat store', 'weight'],
    iconType: 'brick',
    colorScheme: {
      primary: '#dc2626',
      secondary: '#fee2e2',
      accent: '#991b1b',
      bg: 'from-red-50 to-orange-50'
    },
    promptHint: 'Think about its heavy weight, rough scratchy texture, heat storage, or grinding into red powder.'
  },
  {
    id: 'toothbrush',
    name: 'Toothbrush',
    subtitle: 'Plastic handle with a bristle head',
    category: 'Bathroom & Care',
    material: 'Plastic handle, nylon bristles',
    dimensions: '18cm length, ~20g',
    commonUses: [
      'brushing teeth',
      'cleaning grout',
      'cleaning jewelry',
      'cleaning shoes',
      'scrubbing small spots'
    ],
    keywords: ['bristles', 'scrub', 'texture', 'splatter paint', 'comb', 'handle', 'lever'],
    iconType: 'toothbrush',
    colorScheme: {
      primary: '#059669',
      secondary: '#d1fae5',
      accent: '#047857',
      bg: 'from-emerald-50 to-teal-50'
    },
    promptHint: 'Think of the stiff bristles for scrubbing or texture, the plastic handle for prying, or flicking ink.'
  },
  {
    id: 'spoon',
    name: 'Spoon',
    subtitle: 'Smooth curved metal scoop',
    category: 'Kitchen & Dining',
    material: 'Stainless steel',
    dimensions: '16cm × 4cm, ~45g',
    commonUses: [
      'eating soup',
      'stirring coffee',
      'eating cereal',
      'scooping food',
      'eating ice cream',
      'stirring tea'
    ],
    keywords: ['concave', 'mirror', 'scoop', 'catapult', 'digging', 'lever', 'tap rhythm', 'chime'],
    iconType: 'spoon',
    colorScheme: {
      primary: '#0284c7',
      secondary: '#e0f2fe',
      accent: '#0369a1',
      bg: 'from-sky-50 to-blue-50'
    },
    promptHint: 'Think of its mirror reflection, lever shape, mini catapult, or metallic tapping sound.'
  },
  {
    id: 'rubber-band',
    name: 'Rubber Band',
    subtitle: 'Stretchy elastic circular loop',
    category: 'Stationery & Office',
    material: 'Natural vulcanized rubber',
    dimensions: '6cm diameter × 1mm, ~1g',
    commonUses: [
      'bundling papers',
      'wrapping cables',
      'holding boxes closed',
      'money roll binder',
      'hair tie',
      'wrist band'
    ],
    keywords: ['elastic', 'tension', 'grip', 'friction', 'slingshot', 'harmonic plucked string', 'spring'],
    iconType: 'rubberband',
    colorScheme: {
      primary: '#ea580c',
      secondary: '#ffedd5',
      accent: '#c2410c',
      bg: 'from-orange-50 to-amber-50'
    },
    promptHint: 'Think about high elasticity, vibration when plucked, grip friction for opening jars, or tension energy.'
  },
  {
    id: 'bottle',
    name: 'Water Bottle',
    subtitle: 'Clear lightweight bottle with screw cap',
    category: 'Everyday Carry',
    material: 'Clear PET plastic',
    dimensions: '22cm × 7cm, 500ml, ~25g empty',
    commonUses: [
      'drinking water',
      'holding juice',
      'reusable bottle',
      'gym hydration',
      'water container'
    ],
    keywords: ['cylinder', 'funnel', 'lens', 'bouyant', 'flotation', 'shaker', 'greenhouse', 'roller'],
    iconType: 'bottle',
    colorScheme: {
      primary: '#0891b2',
      secondary: '#cffafe',
      accent: '#0e7490',
      bg: 'from-cyan-50 to-teal-50'
    },
    promptHint: 'Think of the bottle cut in half as a funnel, filled with water as a magnifying lens, or a flotation device.'
  },
  {
    id: 'towel',
    name: 'Towel',
    subtitle: 'Soft absorbent cotton fabric cloth',
    category: 'Home & Bath',
    material: '100% Terrycloth cotton',
    dimensions: '70cm × 40cm, ~180g',
    commonUses: [
      'drying hands',
      'drying face',
      'wiping spills',
      'dish towel',
      'cleaning cloth',
      'drying dishes'
    ],
    keywords: ['absorbent', 'cushion', 'blindfold', 'insulator', 'sling', 'flag', 'knot rope', 'padding'],
    iconType: 'towel',
    colorScheme: {
      primary: '#7c3aed',
      secondary: '#ede9fe',
      accent: '#6d28d9',
      bg: 'from-purple-50 to-violet-50'
    },
    promptHint: 'Think of heat insulation, sound dampening, padding delicate items, a temporary tourniquet, or a flag signal.'
  },
  {
    id: 'umbrella',
    name: 'Umbrella',
    subtitle: 'Waterproof canopy with hook handle',
    category: 'Outdoor & Weather',
    material: 'Nylon fabric, steel ribs, J-handle',
    dimensions: '90cm canopy diameter, 85cm shaft, ~400g',
    commonUses: [
      'rain protection',
      'sun shade',
      'staying dry',
      'walking stick',
      'parasol'
    ],
    keywords: ['canopy', 'hook', 'shield', 'basket', 'kite', 'parachute', 'reflector', 'barrier'],
    iconType: 'umbrella',
    colorScheme: {
      primary: '#0284c7',
      secondary: '#e0f2fe',
      accent: '#0369a1',
      bg: 'from-sky-50 to-indigo-50'
    },
    promptHint: 'Think of using it upside down as a fruit-gathering basket, a photographer light reflector, or a hook to reach high objects.'
  },
  {
    id: 'hanger',
    name: 'Coat Hanger',
    subtitle: 'Triangular clothes hanger with top hook',
    category: 'Closet & Home',
    material: 'Formed steel wire',
    dimensions: '40cm × 22cm, ~30g',
    commonUses: [
      'hanging shirts',
      'hanging jackets',
      'hanging pants',
      'closet organizer',
      'hanging clothes'
    ],
    keywords: ['triangle', 'hook', 'unbend', 'antenna', 'skewer', 'frame', 'mobile structure', 'lock opener'],
    iconType: 'hanger',
    colorScheme: {
      primary: '#64748b',
      secondary: '#f1f5f9',
      accent: '#475569',
      bg: 'from-slate-50 to-gray-50'
    },
    promptHint: 'Think of unbending it into a marshmallow skewer, bending it into a wreath hoop, or an emergency antenna.'
  },
  {
    id: 'jar',
    name: 'Glass Jar',
    subtitle: 'Clear glass jar with screw lid',
    category: 'Kitchen & Storage',
    material: 'Soda-lime glass, metal tinplate lid',
    dimensions: '12cm height × 8cm diameter, ~250g',
    commonUses: [
      'storing jam',
      'holding preserves',
      'storing spices',
      'canning food',
      'holding coins',
      'drinking glass'
    ],
    keywords: ['transparent', 'terrarium', 'candle holder', 'hourglass', 'shaker', 'sound bell', 'sealable'],
    iconType: 'jar',
    colorScheme: {
      primary: '#14b8a6',
      secondary: '#ccfbf1',
      accent: '#0f766e',
      bg: 'from-teal-50 to-emerald-50'
    },
    promptHint: 'Think of creating a mini closed terrarium, a decorative candle lantern, a maraca shaker, or a round dough cutter.'
  },
  {
    id: 'tennis-ball',
    name: 'Tennis Ball',
    subtitle: 'Fuzzy green bouncy rubber ball',
    category: 'Sports & Play',
    material: 'Felt-covered hollow vulcanized rubber',
    dimensions: '6.7cm diameter, ~58g',
    commonUses: [
      'playing tennis',
      'dog fetch toy',
      'hitting with racket',
      'bouncing against wall',
      'practicing serves'
    ],
    keywords: ['bounce', 'felt', 'hollow', 'chair foot glider', 'back massage roller', 'secret compartment', 'float'],
    iconType: 'tennisball',
    colorScheme: {
      primary: '#84cc16',
      secondary: '#ecfccb',
      accent: '#65a30d',
      bg: 'from-lime-50 to-green-50'
    },
    promptHint: 'Think of slicing it open for a hidden storage pocket, chair leg floor protectors, or a deep-tissue trigger point massage ball.'
  },
  {
    id: 'pencil',
    name: 'Pencil',
    subtitle: 'Wooden pencil with graphite lead & eraser',
    category: 'Stationery & Writing',
    material: 'Cedar wood, graphite-clay core, rubber tip',
    dimensions: '19cm × 0.7cm, ~6g',
    commonUses: [
      'writing notes',
      'drawing sketches',
      'erasing mistakes',
      'shading art',
      'doing homework'
    ],
    keywords: ['straight stick', 'graphite lubricant', 'hair pin', 'drumstick', 'plant stake', 'pivot axle', 'lever'],
    iconType: 'pencil',
    colorScheme: {
      primary: '#f59e0b',
      secondary: '#fef3c7',
      accent: '#b45309',
      bg: 'from-amber-50 to-yellow-50'
    },
    promptHint: 'Think of the graphite as a dry metal lubricant, the wooden shaft as a plant support stake, a hair bun stick, or a mini rolling pin.'
  },
  {
    id: 'box',
    name: 'Cardboard Box',
    subtitle: 'Foldable brown packing box',
    category: 'Shipping & Storage',
    material: 'Corrugated kraft paper cardboard',
    dimensions: '30cm × 20cm × 15cm, ~200g',
    commonUses: [
      'moving house',
      'shipping packages',
      'storing items in closet',
      'shoe box storage',
      'mailing gifts'
    ],
    keywords: ['flat panels', 'insulation', 'solar oven', 'cat playhouse', 'paint canvas', 'drawer divider', 'mask'],
    iconType: 'box',
    colorScheme: {
      primary: '#b45309',
      secondary: '#ffedd5',
      accent: '#78350f',
      bg: 'from-amber-50 to-orange-50'
    },
    promptHint: 'Think of unfolding it into floor painting drop sheets, making a solar pizza oven, cat fortress, or drawer organizer bins.'
  },
  {
    id: 'lightbulb',
    name: 'Lightbulb',
    subtitle: 'Pear-shaped bulb with screw base',
    category: 'Home & Lighting',
    material: 'Blown clear glass, tungsten filament, brass screw base',
    dimensions: '11cm × 6cm, ~35g',
    commonUses: [
      'room lighting',
      'desk lamp bulb',
      'ceiling illumination',
      'lighting up dark rooms'
    ],
    keywords: ['pear shape', 'hollow glass', 'hanging vase', 'oil lamp', 'snow globe', 'hot glass crafting'],
    iconType: 'lightbulb',
    colorScheme: {
      primary: '#eab308',
      secondary: '#fef9c3',
      accent: '#a16207',
      bg: 'from-yellow-50 to-amber-50'
    },
    promptHint: 'Think of carefully removing the base to create a hanging water propagation vase, a terrarium ornament, or a holiday snow globe.'
  },
  {
    id: 'sponge',
    name: 'Sponge',
    subtitle: 'Yellow foam block with scrub pad',
    category: 'Kitchen & Cleaning',
    material: 'Cellulose foam + abrasive nylon fiber scouring top',
    dimensions: '11cm × 7cm × 2.5cm, ~15g',
    commonUses: [
      'washing dishes',
      'scrubbing pots and pans',
      'wiping kitchen counter',
      'cleaning kitchen sink'
    ],
    keywords: ['sponge texture', 'moisture reservoir', 'paint texture stamp', 'ice pack', 'seed germinator', 'pin cushion'],
    iconType: 'sponge',
    colorScheme: {
      primary: '#ca8a04',
      secondary: '#fef08a',
      accent: '#854d0e',
      bg: 'from-yellow-50 to-lime-50'
    },
    promptHint: 'Think of soaking and freezing it into a drip-free ice pack, a needle cushion, sprouting chia seeds, or textured wall painting.'
  },
  {
    id: 'key',
    name: 'Key',
    subtitle: 'Brass key with ridged teeth',
    category: 'Hardware & Security',
    material: 'Machined nickel-plated brass alloy',
    dimensions: '5.5cm × 2.5cm, ~12g',
    commonUses: [
      'unlocking front door',
      'locking deadbolt',
      'turning lock cylinder',
      'opening padlock'
    ],
    keywords: ['brass teeth', 'tape cutter', 'flathead screwdriver', 'scratch lottery', 'wind chime chime', 'conductive metal'],
    iconType: 'key',
    colorScheme: {
      primary: '#d97706',
      secondary: '#fef3c7',
      accent: '#92400e',
      bg: 'from-amber-50 to-yellow-50'
    },
    promptHint: 'Think of the ridged teeth as a box tape cutter, emergency flathead screwdriver, guitar pick, or scratching tool.'
  },
  {
    id: 'fork',
    name: 'Fork',
    subtitle: 'Four-pronged dining fork',
    category: 'Kitchen & Dining',
    material: 'Polished stainless steel',
    dimensions: '18cm length, ~40g',
    commonUses: [
      'eating salad',
      'eating pasta and noodles',
      'eating steak or chicken',
      'dining utensil'
    ],
    keywords: ['four prongs', 'pie crust crimper', 'whisking eggs', 'back scratcher', 'plant soil aerator', 'trowel rake'],
    iconType: 'fork',
    colorScheme: {
      primary: '#475569',
      secondary: '#f8fafc',
      accent: '#1e293b',
      bg: 'from-slate-50 to-stone-50'
    },
    promptHint: 'Think of crimping decorative pastry crust edges, miniature soil cultivator rake, back scratcher, or quick egg whisk.'
  },
  {
    id: 'book',
    name: 'Book',
    subtitle: 'Bound book with thick cover',
    category: 'Media & Reading',
    material: 'Paper pulp pages, cloth/board cover binding',
    dimensions: '22cm × 15cm × 3.5cm, ~500g',
    commonUses: [
      'reading stories and chapters',
      'studying textbook',
      'learning information',
      'display on bookshelf'
    ],
    keywords: ['flat weight', 'paper press', 'monitor riser stand', 'hollow secret safe', 'flower pressing', 'fire starter'],
    iconType: 'book',
    colorScheme: {
      primary: '#be123c',
      secondary: '#ffe4e6',
      accent: '#881337',
      bg: 'from-rose-50 to-red-50'
    },
    promptHint: 'Think of pressing botanical flowers between dry pages, a solid monitor riser block, a doorstop, or carving out a secret safe.'
  },
  {
    id: 'candle',
    name: 'Candle',
    subtitle: 'Solid wax pillar with cotton wick',
    category: 'Home & Decor',
    material: 'Paraffin/soy wax, braided cotton wick',
    dimensions: '10cm height × 6cm diameter, ~250g',
    commonUses: [
      'lighting up dark rooms',
      'birthday candle blowing',
      'scented aromatherapy',
      'dinner table atmosphere'
    ],
    keywords: ['solid wax', 'zipper lubricant', 'waterproof leather seal', 'drawing wax resist', 'heat source', 'molding putty'],
    iconType: 'candle',
    colorScheme: {
      primary: '#ea580c',
      secondary: '#ffedd5',
      accent: '#9a3412',
      bg: 'from-orange-50 to-yellow-50'
    },
    promptHint: 'Think of rubbing unlit wax on stubborn zippers to unstick them, waterproofing canvas shoes, or wax-resist watercolor painting.'
  },
  {
    id: 'magnet',
    name: 'Magnet',
    subtitle: 'U-shaped magnet with magnetic poles',
    category: 'Hardware & Tools',
    material: 'Alnico / Neodymium magnetic iron alloy',
    dimensions: '8cm × 6cm × 1.5cm, ~120g',
    commonUses: [
      'sticking notes on fridge',
      'holding kitchen memos',
      'holding paper lists',
      'physics classroom demonstrations'
    ],
    keywords: ['magnetic field', 'retrieving dropped screws', 'stud finder wall', 'compass needle maker', 'clasp clamp'],
    iconType: 'magnet',
    colorScheme: {
      primary: '#dc2626',
      secondary: '#fee2e2',
      accent: '#991b1b',
      bg: 'from-red-50 to-blue-50'
    },
    promptHint: 'Think of finding hidden wall drywall screws/studs, picking up scattered sewing needles, or magnetizing a sewing needle to make a floating compass.'
  }
];

export function GET_RANDOM_ITEM(excludeIds: string[] = []): ItemDefinition {
  const available = ITEM_BANK.filter((item) => !excludeIds.includes(item.id));
  if (available.length === 0) {
    return ITEM_BANK[Math.floor(Math.random() * ITEM_BANK.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

export function GET_ITEM_BY_ID(id: string): ItemDefinition | undefined {
  return ITEM_BANK.find((item) => item.id === id);
}
