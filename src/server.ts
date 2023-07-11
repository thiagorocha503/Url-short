import { App } from '@/app';
import { IndexRouter } from '@/routes/index.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new IndexRouter(), ]);

app.listen();
