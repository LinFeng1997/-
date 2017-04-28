// deeplink配置
import { ChooseCoursePage } from '../pages/home/choose-course';
import { RecommandP2pPage } from '../pages/recommand/recommand-p2p'

export const ActionLinks: any = [
	{ component: ChooseCoursePage, name: 'ChooseCourse', segment: 'chooseCourse' },
	{ component: RecommandP2pPage, name: 'RecommandP2p', segment: 'recommandP2p' },
];