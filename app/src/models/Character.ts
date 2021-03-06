import Stats from './stats';
import Cybernetics, { Cybernetic } from './cybernetics';
import Armor from './armor';
import Roles from './roles';
import Weapon from './weapon';
import InventoryRecord from './gear';
import { Skill } from './Skill';

// todo: Slowly start changing this to an interface, and remove functions and put them in helper.ts
export default class Character {
	name: string;
	role: Roles;
	characterPoints: number;
	reputation: number;
	skills: Skill[];
	specialSkill: Skill;
	stats: Stats;
	wounds: number;
	inventory: {
		cybernetics: Cybernetic[];
		armor: Armor[];
		weapons: Weapon[];
		gear: GearItem[];
		eddies: number;
	};

	// move these out
	getBTM = () => {
		const body = this.stats.body;
		if (body <= 2) return 0;
		if (body <= 4) return -1;
		if (body <= 7) return -2;
		if (body <= 9) return -3;
		if (body == 10) return -4;
		if (body >= 11) return -5;
	};

	// Todo: figure out custom languages or expert x or martial arts
	// Todo: figure out complete custom skill

	calculateLocationSp = (location: 'head' | 'torso' | 'arms' | 'legs'): number => {
		const armors = this.inventory.armor.filter((a) => a[location]);
		return calculateSp(armors);
	};

	armor: {
		head: number;
		torso: number;
		rightArm: number;
		leftArm: number;
		rightLeg: number;
		leftLeg: number;
	};

	// this is overkill for MVP
	currentArmor = {
		head: {
			damage: 0,
			getSp: () => this.calculateLocationSp('head')
		},
		torso: {
			damage: 0,
			getSp: () => this.calculateLocationSp('head')
		},
		rightArm: {
			damage: 0,
			getSp: () => this.calculateLocationSp('arms')
		},
		leftArm: {
			damage: 0,
			getSp: () => this.calculateLocationSp('arms')
		},
		rightLeg: {
			damage: 0,
			getSp: () => this.calculateLocationSp('legs')
		},
		leftLeg: {
			damage: 0,
			getSp: () => this.calculateLocationSp('legs')
		}
	};

	//Lifepath
	style: {
		clothes: string;
		hair: string;
		affectations: string;
		ethnicity: string;
		language: string;
	};
	motivations: {
		traits: string;
		valuedPerson: string;
		valueMost: string;
		valuedPossession: string;
		attitude: string;
	};

	lifeDetails: string;
}

export interface GearItem {
	name: string;
	desc: string;
	count: number;
}

const calculateSp = (armors: Armor[]) => {
	const [first, ...others] = armors.sort((a, b) => a.stoppingPower - b.stoppingPower).slice(0, 3);
	if (!first) return 0;
	const sp = others.reduce((prev, curr) => (prev += bonusSp(prev - curr.stoppingPower)), first.stoppingPower);
	return sp;
};

const bonusSp = (diff: number) => {
	if (diff <= 4) return 5;
	if (diff <= 8) return 4;
	if (diff <= 14) return 3;
	if (diff <= 20) return 2;
	if (diff <= 26) return 1;
	return 0;
};
