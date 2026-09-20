import { definePrismaConfig } from 'prisma/config';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

export default definePrismaConfig({
	skills: {
		agents: ['claude']
	},
	orm: ormConfig({
		contract: './prisma/contract.prisma',
		db: {
			connection: process.env['DIRECT_URL']!
		}
	})
});
