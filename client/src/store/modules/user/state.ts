import { User } from '@/types';

export type UserState = {
	user: User|null;
}

function state(): UserState {
	return {
		user: null,
	}
}

export default state;