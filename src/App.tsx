import { Flex, List } from 'antd';
import './App.css';
import SealDemo from './SealDemo';

const data: { type: 'star' | 'dot'; name: string; bold: boolean }[] = [
	{ type: 'dot', name: '박', bold: false },
	{ type: 'star', name: '박', bold: false },
	{ type: 'dot', name: '박', bold: true },
	{ type: 'star', name: '박', bold: true },

	{ type: 'dot', name: '박박', bold: false },
	{ type: 'star', name: '박박', bold: false },
	{ type: 'dot', name: '박박', bold: true },
	{ type: 'star', name: '박박', bold: true },

	{ type: 'dot', name: '박박박', bold: false },
	{ type: 'star', name: '박박박', bold: false },
	{ type: 'dot', name: '박박박', bold: true },
	{ type: 'star', name: '박박박', bold: true },

	{ type: 'dot', name: '박박박박', bold: false },
	{ type: 'star', name: '박박박박', bold: false },
	{ type: 'dot', name: '박박박박', bold: true },
	{ type: 'star', name: '박박박박', bold: true },

	{ type: 'dot', name: '박박박박박', bold: false },
	{ type: 'star', name: '박박박박박', bold: false },
	{ type: 'dot', name: '박박박박박', bold: true },
	{ type: 'star', name: '박박박박박', bold: true },

	{ type: 'dot', name: '박박박박박박', bold: false },
	{ type: 'star', name: '박박박박박박', bold: false },
	{ type: 'dot', name: '박박박박박박', bold: true },
	{ type: 'star', name: '박박박박박박', bold: true },

	{ type: 'dot', name: '박박박박박박박', bold: false },
	{ type: 'star', name: '박박박박박박박', bold: false },
	{ type: 'dot', name: '박박박박박박박', bold: true },
	{ type: 'star', name: '박박박박박박박', bold: true },

	{ type: 'dot', name: '박박박박박박박박', bold: false },
	{ type: 'star', name: '박박박박박박박박', bold: false },
	{ type: 'dot', name: '박박박박박박박박', bold: true },
	{ type: 'star', name: '박박박박박박박박', bold: true },

	{ type: 'dot', name: '박박박박박박박박박', bold: false },
	{ type: 'star', name: '박박박박박박박박박', bold: false },
	{ type: 'dot', name: '박박박박박박박박박', bold: true },
	{ type: 'star', name: '박박박박박박박박박', bold: true },
];

function App() {
	return (
		<div>
			<Flex gap={100} vertical>
				<List
					grid={{ gutter: 16, column: 4 }}
					dataSource={data}
					renderItem={(item) => (
						<List.Item>
							<SealDemo type={item.type} companyName={item.name} bold={item.bold} />
						</List.Item>
					)}
				/>
			</Flex>
		</div>
	);
}

export default App;
